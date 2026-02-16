import { Suspense } from "react";
import { Spinner } from "@heroui/spinner";

import { UsersTable } from "../../components/UsersTable/UsersTable";

import { Section } from "./components";

function AdminDashboardScreen() {
  return (
    <div className="min-h-screen bg-gray-50/50 flex justify-center p-8">
      <div className="flex flex-col gap-8">
        <Section title="Usuários">
          <Suspense
            fallback={
              <div className="flex justify-center items-center p-8">
                <Spinner size="lg" />
              </div>
            }
          >
            <UsersTable />
          </Suspense>
        </Section>
      </div>
    </div>
  );
}

export default AdminDashboardScreen;
