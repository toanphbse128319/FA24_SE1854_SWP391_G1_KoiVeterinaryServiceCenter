using Repositories.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Repository
{
    public class ServiceUseRepository : GenericRepository<ServiceUse>
    {
        public ServiceUseRepository(Context context)
            : base(context)
        {
        }
}
}
