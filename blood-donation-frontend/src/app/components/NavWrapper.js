"use client";

import { usePathname } from "next/navigation";
import CustomNav from "./customNav";

export default function NavWrapper({ children }) {
  const pathname = usePathname();
  const showNav = !pathname.startsWith("/donorDashboard") &&
    !pathname.startsWith("/patientDashboard") &&
    !pathname.startsWith("/AdminDashboard") &&
    !pathname.startsWith("/UpdateAvailability") &&
    !pathname.startsWith("/newBloodRequest") &&
    !pathname.startsWith("/ThankYouDonor") &&
    !pathname.startsWith("/viewRequestHistory") &&
    !pathname.startsWith("/ContactDonor") &&
    !pathname.startsWith("/ManageDonors") &&
    !pathname.startsWith("/ManagePatients") &&
    !pathname.startsWith("/AllBloodRequest") &&
    !pathname.startsWith("/AdminManagement") &&
    !pathname.startsWith("/UpdateProfile");


  return (
    <>
      {showNav && <CustomNav />}
      {children}
    </>
  );
}