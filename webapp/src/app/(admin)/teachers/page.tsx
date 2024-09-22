import { CustomAddTeacherSheet } from "@/components/custom-add-teacher-sheet";
import { DataTable } from "@/components/data-table";
import { getTeachers } from "@/lib/data/school";
import { columns } from "./columns";
import { PageTtle } from "@/components/page-title";

const AdminTeacersPage = async () => {
  const teachers = await getTeachers();

  return (
    <div className="flex flex-col gap-6 px-4 pb-9 pt-8 md:px-8">
      <div>
        <PageTtle label="Teachers" />
        <p>
          Explore Your Teachers Easily and Check Individual Profiles with a
          Click
        </p>
      </div>
      <DataTable
        columns={columns}
        data={teachers}
        columnVisibilityObj={{
          email: false,
        }}
        addButton={
          <>
            <CustomAddTeacherSheet />
          </>
        }
      />
    </div>
  );
};

export default AdminTeacersPage;
