using Repositories.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Objects;
using Helper;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Repositories.Repository;

public class ServiceUseRepository : GenericRepository<ServiceUse>
{
    public ServiceUseRepository(Context context)
        : base(context)
    {
    }

    public async Task<List<ServiceUse>> GetServiceUseByBDIDAsync( string bdID ){
        return await _context.ServiceUses.Where( su => su.BookingDetailID == bdID ).ToListAsync();
    }

    public bool IsDuplicate( string bdID, string? profile = null ){
        ServiceUse? temp = _context.ServiceUses.FirstOrDefault( su => su.BookingDetailID == bdID &&
                                                                     su.ProfileID == profile);
        if( temp == null )
            return false;
        return true;
    }

    public async Task<string> AddServiceUse(string bdID, string pID){
        if( string.IsNullOrEmpty( pID ) )
            return "Invalid: profile id cannot be empty";
        if( IsDuplicate( bdID, pID ) )
            return "Duplicate";
        ServiceUse temp = new(){ 
            BookingDetailID = bdID,
            ServiceUseID = base.GetNextID("SU"),
            ProfileID = pID
        };
        if( await base.CreateAsync( temp ) == 0 )
            return "Invalid";
        return "Success";
    }

    public async Task<string> AddRangeServiceUse( string BookingDetailID,  List<string> profileIDs = null! ){
        if( profileIDs == null )
            return "Invalid: profile id cannot be empty";
        foreach( string id in profileIDs ){
            string result = await AddServiceUse( BookingDetailID, id );
            if( result.ToLower().Contains("invalid") )
                return result;
        }
        return "Success";
    }

    //This will ignore ServiceID, BookingID, IsIncidental from Profiles
    public async Task<string> LogBooked( Profiles profiles ){
        if( profiles == null )
            return "Invalid: profile id cannot be empty";
        List<string> animalProfiles = new List<string>();
        List<string> poolProfiles = new List<string>();
        AnimalProfileRepository animalRepo = new(_context);
        BookingDetailRepository bdRepo = new(_context);
        ServiceDeliveryMethodRepository sdmRepo = new(_context);
        ServiceRepository serviceRepo = new(_context);
        BookingDetail bd = await bdRepo.GetByIdAsync( profiles.BookingDetail.BookingDetailID );
        BookingRepository bookRepo = new(_context);
        Booking bookingOrder = await bookRepo.GetByIdAsync( profiles.BookingDetail.BookingID );

        if( bookingOrder == null )
            return "Invalid: Cannot find the booking order";
        if( bd == null )
            return "Invalid: Cannot determined the booking detail info";
        Service service = await serviceRepo.GetByIdAsync(profiles.BookingDetail.ServiceID );
        if( service == null )
            return "Invalid: Cannot determined the service";
        string type = await sdmRepo.GetServicedType( service.ServiceDeliveryMethodID );

        bookingOrder.Status += " " + Configuration.GetConfiguration()["Other:PreOrderedWorkConfirmation"];
        if( await bookRepo.UpdateAsync( bookingOrder ) < 1 )
            return "Invalid: Failed to update booking status";

        if (string.IsNullOrEmpty(profiles.BookingDetail.ExaminationResult) == false)
            bd.ExaminationResult = profiles.BookingDetail.ExaminationResult;
        if (string.IsNullOrEmpty(profiles.BookingDetail.VetConsult) == false)
            bd.VetConsult = profiles.BookingDetail.VetConsult;
        if (string.IsNullOrEmpty(profiles.BookingDetail.Formulary) == false)
            bd.Formulary = profiles.BookingDetail.Formulary;
        if (profiles.BookingDetail.IsIncidental != bd.IsIncidental)
            bd.IsIncidental = profiles.BookingDetail.IsIncidental;
        if (string.IsNullOrEmpty(profiles.BookingDetail.NoteResult) == false)
            bd.NoteResult = profiles.BookingDetail.NoteResult;
        Console.WriteLine(bd.ExaminationResult + bd.VetConsult +bd.Formulary +bd.NoteResult);

        if ( await bdRepo.UpdateAsync( bd ) < 1 ) 
            return "Invalid: Failed to update booking detail info";

        if( type == "fish" ){
            foreach( var profile in profiles.AnimalProfiles ){
                profile.AnimalProfileID = await animalRepo.AddAnimalProfileAsync( profile );
                animalProfiles.Add(profile.AnimalProfileID);
            }
            return await AddRangeServiceUse( profiles.BookingDetail.BookingDetailID, animalProfiles );
        } else if ( type == "pool" ){
            PoolProfileRepository poolRepo = new(_context);
            foreach( var profile in profiles.PoolProfiles ){
                profile.PoolProfileID = await poolRepo.AddPoolProfileAsync( profile );
                poolProfiles.Add( profile.PoolProfileID );
            }
            return await AddRangeServiceUse( profiles.BookingDetail.BookingDetailID, poolProfiles );
        } else return "Nothing";

    }

    private string IsAnimalOrPool( BookingDetail detail ){
        ServiceRepository serviceRepo = new(_context);
        ServiceDeliveryMethodRepository sdmRepo = new(_context);
        Service service = serviceRepo.GetById( detail.ServiceID );
        if( service == null )
            return "Invalid: Cannot find the service";
        ServiceDeliveryMethod sdm = sdmRepo.GetById( service.ServiceDeliveryMethodID );
        if( sdm == null )
            return "Invalid: Cannot determined the service delivery method";
        if( sdm.Name.ToLower().Contains("Hồ") )
            return "pool";
        else return "fish";
    }

    private async Task<List<string>> GetProfiles( string bookingID ){
        BookingDetailRepository bdRepo = new(_context);
        List<BookingDetail> bds = await bdRepo.GetByBookingID( bookingID );
        if( bds.Count() == 0 )
            return null!;
        List<string> profiles = new List<string>();
        List<ServiceUse> temp = new List<ServiceUse>();
        foreach( BookingDetail bd in bds ){
            temp.AddRange( await GetServiceUseByBDIDAsync(bd.BookingDetailID) );
        }
        if( temp.Count() == 0 )
            return null!;
        foreach( ServiceUse su in temp ){
            if( su.ProfileID == null )
                continue;
            if( profiles.Contains( su.ProfileID ) )
                continue;
            profiles.Add( su.ProfileID );
        }
        return profiles;
    }

    private List<string> FilterAnimalProfile( List<string> profiles ){
        List<string> temp = new List<string>();
        if( profiles == null || profiles.Count() == 0 )
            return temp; 
        foreach( string profile in profiles ){
            if( profile.ToLower().Contains("ap") )
                temp.Add( profile );
        }
        return temp;
    }

    private List<string> FilterPoolProfile( List<string> profiles ){
        List<string> temp = new List<string>();
        if( profiles == null || profiles.Count() == 0 )
            return temp; 
        foreach( string profile in profiles ){
            if( profile.ToLower().Contains("pp") )
                temp.Add( profile );
        }
        return temp;
    }

    public async Task<string> LogIncidental( ExaminationResult exam ){
        if( exam.IsNullOrEmpty() )
            return "Invalid: Missing fields";
        bool allSameBookingId = exam.BookingDetails.All(x => x.BookingID == exam.BookingDetails[0].BookingID);
        if( allSameBookingId == false )
            return "Invalid: Booking ID is inconsistent!!";

        List<string> temp = await GetProfiles(exam.BookingDetails[0].BookingID);
        if (temp == null)
            return exam.BookingDetails[0].BookingID;

        List<string> animalProfiles = FilterAnimalProfile( temp );
        List<string> poolProfiles = FilterPoolProfile( temp );

        BookingDetailRepository bdRepo = new(_context);
        List<BookingDetail> bds = await bdRepo.GetByBookingID( exam.BookingDetails[0].BookingID );
        foreach( BookingDetail bd in exam.BookingDetails ){
            if( await bdRepo.isDuplicateServiceOfBooking( bd.BookingID, bd.ServiceID ) )
                continue;
            bds.Add( bd );
        }

        if( exam.AnimalProfiles != null && exam.AnimalProfiles.Count() > 0 ){
            AnimalProfileRepository animalRepo = new(_context);
            foreach( AnimalProfile profile in exam.AnimalProfiles ){
                if( animalRepo.IsDuplicate( profile ) )
                    continue;
                profile.AnimalProfileID = await animalRepo.AddAnimalProfileAsync( profile );
                if( profile.AnimalProfileID.ToLower().Contains( "invalid" ) )
                    return profile.AnimalProfileID;
                animalProfiles.Add(profile.AnimalProfileID);
            }
        }


    

        if ( exam.PoolProfiles != null && exam.PoolProfiles.Count() > 0 ){
            PoolProfileRepository poolRepo = new(_context);
            foreach( PoolProfile profile in exam.PoolProfiles ){
                if( poolRepo.IsDuplicate( profile ) ) 
                    continue;
                profile.PoolProfileID = await poolRepo.AddPoolProfileAsync( profile );
                if( profile.PoolProfileID.ToLower().Contains( "invalid" ) )
                    return profile.PoolProfileID;
                poolProfiles.Add( profile.PoolProfileID );
            }
        }

        foreach( BookingDetail bd in exam.BookingDetails ){
            bd.BookingDetailID = await bdRepo.AddBookingDetailAsync( bd );
            if( bd.BookingDetailID.ToLower().Contains( "invalid" ) )
                return bd.BookingDetailID;
            Console.WriteLine( bd.BookingDetailID );
            temp.Add( bd.BookingDetailID );
        }

        ServiceDeliveryMethodRepository sdmRepo = new(_context);
        ServiceRepository serviceRepo = new(_context);
        foreach( BookingDetail bd in bds ){
            Service service = await serviceRepo.GetByIdAsync( bd.ServiceID );
            if( service == null )
                return "Invalid: Failed to determined the service";

            string type = await sdmRepo.GetServicedType( service.ServiceDeliveryMethodID );
            if( type == "pool" ){
                await AddRangeServiceUse( bd.BookingDetailID, poolProfiles );
            } else if( type == "fish" ){
                await AddRangeServiceUse( bd.BookingDetailID, animalProfiles );
            }
        }
        BookingRepository bookingRepository = new(_context);
        Booking booking = bookingRepository.GetById(exam.BookingDetails[0].BookingID);
        booking.IncidentalFish = booking.IncidentalFish + exam.IncidentalFish;
        booking.IncidentalPool = booking.IncidentalPool + exam.IncidentalPool;
        booking.TotalServiceCost = await bookingRepository.GetTotalPriceAsync( booking.BookingID );
        bookingRepository.Update(booking);
        return "Success";
    }

}

