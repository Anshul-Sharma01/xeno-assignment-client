
interface TenantData{
    id : string;
    email : string;
    shopifyDomain : string;
}

const TenantProfile : React.FC < { tenantData : TenantData | null } > = ({ tenantData }) => {


    


  return (
    <div className="bg-[#F2F8FF] flex items-center gap-4 rounded-xl px-4 py-2 border border-gray-300 shadow-sm hover:shadow-md transition group w-fit cursor-pointer">
      <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80" alt="Avatar Vector" className="h-12 w-12 rounded-full border border-gray-400 group-hover:scale-105 transition-transform duration-200" />

      <div className="flex flex-col">
        <p title="Tenant Email" className="text-sm font-medium text-gray-800 truncate max-w-[180px]" >
          {tenantData?.email }
        </p>
        <a target="_blank" href={tenantData?.shopifyDomain} className="text-[#0F62FE] text-sm hover:underline truncate max-w-[180px]" title="Shopify Domain"
        >
          {tenantData?.shopifyDomain }
        </a>
      </div>
    </div>
  );
};

export default TenantProfile;
