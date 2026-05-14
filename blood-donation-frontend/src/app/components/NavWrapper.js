"use client";

import { usePathname } from "next/navigation";
import CustomNav from "./customNav";

export default function NavWrapper({ children }) {
  const pathname = usePathname();
  const showNav = !pathname.startsWith("/donorDashboard") && 
                  !pathname.startsWith("/patientDashboard") && 
                  !pathname.startsWith("/AdminDashboard")&&
                  !pathname.startsWith("/UpdateAvailability")&&
                  !pathname.startsWith("/UpdateProfile");
                  

  return (
    <>
      {showNav && <CustomNav />}
      {children}
    </>
  );
}