interface TenantData {
  tenant_id: string;
  tenant_email: string;
  tenant_domain: string;
  tenant_name: string;
}

const TenantProfile: React.FC<{ tenantData: TenantData | null }> = ({ tenantData }) => {
  return (
    <div className="bg-white flex items-center gap-4 rounded-2xl px-6 py-4 border border-gray-200 shadow-md hover:shadow-lg transition group w-fit cursor-pointer">
      <div className="relative">
        <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80" alt="Avatar Vector" className="h-14 w-14 rounded-full border-2 border-[#0F62FE] group-hover:scale-105 transition-transform duration-200" />
      </div>

      <div className="flex flex-col">
        <h2 className="text-base font-semibold text-gray-900" title="Tenant Name">
          {tenantData?.tenant_name || "Unknown Tenant"}
        </h2>
        <p title="Tenant Email" className="text-sm text-gray-600 truncate max-w-[200px]" >
          {tenantData?.tenant_email}
        </p>
        <a target="_blank"  href={tenantData?.tenant_domain} className="text-[#0F62FE] text-sm font-medium hover:underline truncate max-w-[200px]" title="Shopify Domain" >
          {tenantData?.tenant_domain}
        </a>
      </div>
    </div>
  );
};

export default TenantProfile;
