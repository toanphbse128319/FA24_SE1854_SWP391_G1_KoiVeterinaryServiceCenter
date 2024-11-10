using Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;

namespace Repositories.Repository
{
    public class FeedbackRepository : GenericRepository<Feedback>
    {
        private UnitOfWork _unitOfWork;
        public FeedbackRepository(Context context)
            : base(context)
        {
        }

        public async Task<Booking> AddFeedBack(Feedback feedback, string BookingID)
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            feedback.FeedbackID = GetNextID("F");
            Booking TempDataAttribute = null;
            try
            {  
                feedback.Status = "Active";
                    await (new FeedbackRepository(_context)).CreateAsync(feedback);
                    Booking? booking = await (new BookingRepository(_context)).GetByIdAsync(BookingID);
                    booking.FeedbackID = feedback.FeedbackID;       
                    await (new BookingRepository(_context)).UpdateAsync(booking);
                TempDataAttribute = booking;
                await transaction.CommitAsync();
                return TempDataAttribute;
            }
            finally

            {   if(TempDataAttribute == null)
                {
                     await transaction.RollbackAsync();
                }

                    
                 
            
            }
          
        }


            public async Task<Feedback> SaveAndGetFeedbackAsync(Feedback feedback){
            if (feedback.Description == null)
                feedback.Description = "";
            feedback.FeedbackID = GetNextID("F");
            await base.CreateAsync(feedback);
            return feedback;
        }
    }
}
