"use client";

import Link from "next/link";
import AgentPulse from "./AgentPulse";
import { SignedIn } from "@clerk/nextjs";
// import { Button } from "./ui/button";

function Header() {
  return (
    <header className="sticky left-0 top-0 right-0 z-50 px-4 md:px-0">
      <div className=" container mx-auto">
        {/* Left section */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <AgentPulse size="small" color="blue" />
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Agentive
            </h1>
          </Link>
        </div>
        {/* Right section */}
        <div>
          <SignedIn>
            <Link href="/manage-plan">
              {/* <Button>Manage Plan</Button> */}
            </Link>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default Header;
