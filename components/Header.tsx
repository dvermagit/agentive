"use client";

import Link from "next/link";
import AgentPulse from "./AgentPulse";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
// import { Button } from "./ui/button";

function Header() {
  return (
    <header className="sticky left-0 top-0 right-0 px-4 md:px-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className=" container mx-auto">
        <div className="flex items-center justify-between h-16 ">
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
          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link href="/manage-plan">
                <Button
                  variant="outline"
                  className="mr-4 bg-gradient-to-r  from-blue-600 to-blue-400 bg-clip-text text-transparent"
                >
                  Manage Plan
                </Button>
              </Link>

              <div className="p-2 w-10 h-10 flex items-center justify-center rounded-full border bg-blue-100 border-blue-200">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
