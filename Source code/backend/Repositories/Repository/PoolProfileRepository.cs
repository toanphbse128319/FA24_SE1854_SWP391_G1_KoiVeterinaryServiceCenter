using Microsoft.EntityFrameworkCore;
using Repositories.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Repository
{
    public class PoolProfileRepository : GenericRepository<PoolProfile>
    {
        public PoolProfileRepository(Context context) 
        {
            _context = context;
        }

        public async Task<PoolProfile?> AddPoolProfileAsync(PoolProfile poolprofile)
        {
            if (poolprofile.PoolProfileID == "")
            {
                int index = base.GetAll().Count;
                poolprofile.PoolProfileID = "PP" + index;
            }
            await base.CreateAsync(poolprofile);
            return poolprofile;
        }
    }
}
