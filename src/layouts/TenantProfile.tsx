import { MdKeyboardArrowDown } from "react-icons/md";

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
          {tenantData?.email || "anshulsharma2926@gmail.com"}
        </p>
        <a target="_blank" href={tenantData?.shopifyDomain || "https://www.google.com"} className="text-[#0F62FE] text-sm hover:underline truncate max-w-[180px]" title="Shopify Domain"
        >
          {tenantData?.shopifyDomain || "www.google.com"}
        </a>
      </div>

      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 ">
        <button className="px-3 py-1 text-sm text-white bg-[#0F62FE] rounded-lg hover:bg-red-500 transition-colors duration-200 cursor-pointer">
          Logout
        </button>
        <MdKeyboardArrowDown className="text-gray-600 group-hover:rotate-180 transition-transform duration-200" />
      </div>
    </div>
  );
};

export default TenantProfile;
