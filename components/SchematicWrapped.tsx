"use client";
import { useClerk } from "@clerk/nextjs";
import { useSchematicEvents } from "@schematichq/schematic-react";
import { useEffect } from "react";

const SchematicWrapped = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { identify } = useSchematicEvents();
  const { user } = useClerk();

  useEffect(() => {
    const username =
      user?.username ??
      user?.fullName ??
      user?.emailAddresses[0]?.emailAddress ??
      user?.id;

    if (user?.id) {
      identify({
        //Company level Key
        company: {
          keys: {
            id: user.id,
          },
          name: username,
        },
        //User level Key
        keys: {
          id: user.id,
        },
        name: username,
      });
    }
  }, [user, identify]);
  return <>{children}</>;
};

export default SchematicWrapped;
