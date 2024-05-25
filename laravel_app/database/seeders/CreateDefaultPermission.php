<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Permission;
use App\Models\Role;
use App\Repositories\EmployeeRepository;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreateDefaultPermission extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
//        $this->permission_v1();
        $this->permission_v2();
    }

    public function permission_v2() {
        try {
            DB::beginTransaction();
            $updateDriverAgencyPerm = Permission::create([ 'name' => 'update-driver-agency', 'display_name' => 'Update driver agency', 'type' => 6]);
//            $permissions = Permission::all();
            $super = Role::where('name', 'superadmin')->first();
            if(isset($super)) {
                $super->givePermission($updateDriverAgencyPerm);
            }
            $admin = Role::where('name', 'admin')->first();
            if(isset($admin)) {
                $admin->givePermission($updateDriverAgencyPerm);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            echo $e->getMessage();
        }
    }

    public function permission_v1() {
        try {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            DB::table('employees')->truncate();
            DB::table('roles')->truncate();
            DB::table('role_user')->truncate();
            DB::table('permissions')->truncate();
            DB::table('permission_role')->truncate();
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');

            $repo_employee = new EmployeeRepository();
            DB::beginTransaction();
            $viewEmployeePerm = Permission::create([ 'name' => 'view-employee', 'display_name' => 'View employee', 'type' => 1]);
            $createEmployeePerm = Permission::create([ 'name' => 'create-employee', 'display_name' => 'Create employee', 'type' => 1]);
            $updateEmployeePerm = Permission::create([ 'name' => 'update-employee', 'display_name' => 'Update employee', 'type' => 1]);
            $deleteEmployeePerm = Permission::create([ 'name' => 'delete-employee', 'display_name' => 'Delete employee', 'type' => 1]);
            $exportEmployeePerm = Permission::create([ 'name' => 'export-employee', 'display_name' => 'Export employee', 'type' => 1]);

            $viewRolePerm = Permission::create([ 'name' => 'view-role', 'display_name' => 'View role', 'type' => 2]);
            $createRolePerm = Permission::create([ 'name' => 'create-role', 'display_name' => 'Create role', 'type' => 2]);
            $updateRolePerm = Permission::create([ 'name' => 'update-role', 'display_name' => 'Update role', 'type' => 2]);
            $deleteRolePerm = Permission::create([ 'name' => 'delete-role', 'display_name' => 'Delete role', 'type' => 2]);

            $viewPassengerPerm = Permission::create([ 'name' => 'view-passenger', 'display_name' => 'View passenger', 'type' => 3]);
            $updatePassengerPerm = Permission::create([ 'name' => 'update-passenger', 'display_name' => 'Update passenger', 'type' => 3]);
            $viewPassengerAddressPerm = Permission::create([ 'name' => 'view-passenger-address', 'display_name' => 'View passenger address', 'type' => 3]);
            $exportPassengerPerm = Permission::create([ 'name' => 'export-passenger', 'display_name' => 'Export passenger', 'type' => 3]);

            $viewInvoicePerm = Permission::create([ 'name' => 'view-invoice', 'display_name' => 'View invoice', 'type' => 4]);
            $exportInvoicePerm = Permission::create([ 'name' => 'export-invoice', 'display_name' => 'Export invoice', 'type' => 4]);

            $viewRatingReviewPerm = Permission::create([ 'name' => 'view-rating-review', 'display_name' => 'View rating review', 'type' => 5]);
            $exportRatingReviewPerm = Permission::create([ 'name' => 'export-rating-review', 'display_name' => 'Export rating review', 'type' => 5]);

            $viewDriverPerm = Permission::create([ 'name' => 'view-driver', 'display_name' => 'View driver', 'type' => 6]);
            $confirmDriverFormPerm = Permission::create([ 'name' => 'confirm-driver-form', 'display_name' => 'Confirm driver form', 'type' => 6]);
            $updateDriverAccountPerm = Permission::create([ 'name' => 'update-driver-account', 'display_name' => 'Update driver account', 'type' => 6]);
            $updateDriverActivePerm = Permission::create([ 'name' => 'update-driver-active', 'display_name' => 'Update driver active', 'type' => 6]);
            $exportDriverPerm = Permission::create([ 'name' => 'export-driver', 'display_name' => 'Export driver', 'type' => 6]);

            $viewTripPerm = Permission::create([ 'name' => 'view-trip', 'display_name' => 'View trip', 'type' => 7]);
            $cancelTripPerm = Permission::create([ 'name' => 'cancel-trip', 'display_name' => 'Cancel trip', 'type' => 7]);
            $exportTripPerm = Permission::create([ 'name' => 'export-trip', 'display_name' => 'Export trip', 'type' => 7]);

            $viewDepositInvoicePerm = Permission::create([ 'name' => 'view-deposit-invoice', 'display_name' => 'View deposit invoice', 'type' => 8]);
            $createDepositInvoicePerm = Permission::create([ 'name' => 'create-deposit-invoice', 'display_name' => 'Create deposit invoice', 'type' => 8]);
            $updateDepositInvoicePerm = Permission::create([ 'name' => 'update-deposit-invoice', 'display_name' => 'Update deposit invoice', 'type' => 8]);
            $exportDepositInvoicePerm = Permission::create([ 'name' => 'export-deposit-invoice', 'display_name' => 'Export deposit invoice', 'type' => 8]);

            $viewSuppportServicePerm = Permission::create([ 'name' => 'view-support-service', 'display_name' => 'View support service', 'type' => 9]);
            $updateSuppportServicePerm = Permission::create([ 'name' => 'update-support-service', 'display_name' => 'Update support service', 'type' => 9]);

            $viewConfigPerm = Permission::create([ 'name' => 'view-config', 'display_name' => 'View config', 'type' => 10]);
            $createConfigPerm = Permission::create([ 'name' => 'create-config', 'display_name' => 'Create config', 'type' => 10]);
            $updateConfigPerm = Permission::create([ 'name' => 'update-config', 'display_name' => 'Update config', 'type' => 10]);

            $viewQuestionPerm = Permission::create([ 'name' => 'view-question', 'display_name' => 'View question', 'type' => 11]);
            $createQuestionPerm = Permission::create([ 'name' => 'create-question', 'display_name' => 'Create question', 'type' => 11]);
            $updateQuestionPerm = Permission::create([ 'name' => 'update-question', 'display_name' => 'Update question', 'type' => 11]);
            $deleteQuestionPerm = Permission::create([ 'name' => 'delete-question', 'display_name' => 'Delete question', 'type' => 11]);

            $viewAnswerPerm = Permission::create([ 'name' => 'view-answer', 'display_name' => 'View answer', 'type' => 12]);
            $createAnswerPerm = Permission::create([ 'name' => 'create-answer', 'display_name' => 'Create answer', 'type' => 12]);
            $updateAnswerPerm = Permission::create([ 'name' => 'update-answer', 'display_name' => 'Update answer', 'type' => 12]);
            $deleteAnswerPerm = Permission::create([ 'name' => 'delete-answer', 'display_name' => 'Delete answer', 'type' => 12]);

            $viewNotificationPerm = Permission::create([ 'name' => 'view-notification', 'display_name' => 'View notification', 'type' => 13]);
            $createNotificationPerm = Permission::create([ 'name' => 'create-notification', 'display_name' => 'Create notification', 'type' => 13]);
            $updateNotificationPerm = Permission::create([ 'name' => 'update-notification', 'display_name' => 'Update notification', 'type' => 13]);
            $deleteNotificationPerm = Permission::create([ 'name' => 'delete-notification', 'display_name' => 'Delete notification', 'type' => 13]);

            $viewDashboardPerm = Permission::create([ 'name' => 'view-dashboard', 'display_name' => 'View dashboard', 'type' => 14]);

            $viewVehiclePerm = Permission::create([ 'name' => 'view-vehicle', 'display_name' => 'View vehicle', 'type' => 15]);
            $exportVehiclePerm = Permission::create([ 'name' => 'export-vehicle', 'display_name' => 'Export vehicle', 'type' => 15]);

            $super = Role::where('name', 'superadmin')->first();
            if(!isset($super)) {
                $super = Role::create([
                    'name' => 'superadmin',
                    'display_name' => 'Super admin',
                    'type' => Role::TYPE_SUPER_ADMIN,
                    'status' => Role::STATUS_ACTIVE
                ]);
            }
            if(isset($super)) {
                $super->givePermission($viewEmployeePerm);
                $super->givePermission($createEmployeePerm);
                $super->givePermission($updateEmployeePerm);
                $super->givePermission($deleteEmployeePerm);
                $super->givePermission($exportEmployeePerm);

                $super->givePermission($viewRolePerm);
                $super->givePermission($createRolePerm);
                $super->givePermission($updateRolePerm);
                $super->givePermission($deleteRolePerm);

                $super->givePermission($viewPassengerPerm);
                $super->givePermission($updatePassengerPerm);
                $super->givePermission($viewPassengerAddressPerm);
                $super->givePermission($exportPassengerPerm);

                $super->givePermission($viewInvoicePerm);
                $super->givePermission($exportInvoicePerm);

                $super->givePermission($viewRatingReviewPerm);
                $super->givePermission($exportRatingReviewPerm);

                $super->givePermission($viewDriverPerm);
                $super->givePermission($confirmDriverFormPerm);
                $super->givePermission($updateDriverAccountPerm);
                $super->givePermission($updateDriverActivePerm);
                $super->givePermission($exportDriverPerm);

                $super->givePermission($viewTripPerm);
                $super->givePermission($cancelTripPerm);
                $super->givePermission($exportTripPerm);

                $super->givePermission($viewDepositInvoicePerm);
                $super->givePermission($createDepositInvoicePerm);
                $super->givePermission($updateDepositInvoicePerm);
                $super->givePermission($exportDepositInvoicePerm);

                $super->givePermission($viewSuppportServicePerm);
                $super->givePermission($updateSuppportServicePerm);

                $super->givePermission($viewConfigPerm);
                $super->givePermission($createConfigPerm);
                $super->givePermission($updateConfigPerm);

                $super->givePermission($viewQuestionPerm);
                $super->givePermission($createQuestionPerm);
                $super->givePermission($updateQuestionPerm);
                $super->givePermission($deleteQuestionPerm);

                $super->givePermission($viewAnswerPerm);
                $super->givePermission($createAnswerPerm);
                $super->givePermission($updateAnswerPerm);
                $super->givePermission($deleteAnswerPerm);

                $super->givePermission($viewNotificationPerm);
                $super->givePermission($createNotificationPerm);
                $super->givePermission($updateNotificationPerm);
                $super->givePermission($deleteNotificationPerm);

                $super->givePermission($viewDashboardPerm);

                $super->givePermission($viewVehiclePerm);
                $super->givePermission($exportVehiclePerm);

            }
            $admin = Role::where('name', 'admin')->first();
            if(!isset($admin)) {
                $admin = Role::create([
                    'name' => 'admin',
                    'display_name' => 'Admin quản trị',
                    'type' => Role::TYPE_ADMIN,
                    'status' => Role::STATUS_ACTIVE
                ]);
            }
            if(isset($admin)) {
                $admin->givePermission($viewEmployeePerm);
                $admin->givePermission($createEmployeePerm);
                $admin->givePermission($updateEmployeePerm);
                $admin->givePermission($deleteEmployeePerm);
                $admin->givePermission($exportEmployeePerm);

//                $admin->givePermission($viewRolePerm);
//                $admin->givePermission($createRolePerm);
//                $admin->givePermission($updateRolePerm);
//                $admin->givePermission($deleteRolePerm);

                $admin->givePermission($viewPassengerPerm);
                $admin->givePermission($updatePassengerPerm);
                $admin->givePermission($viewPassengerAddressPerm);
                $admin->givePermission($exportPassengerPerm);

                $admin->givePermission($viewInvoicePerm);
                $admin->givePermission($exportInvoicePerm);

                $admin->givePermission($viewRatingReviewPerm);
                $admin->givePermission($exportRatingReviewPerm);

                $admin->givePermission($viewDriverPerm);
                $admin->givePermission($confirmDriverFormPerm);
                $admin->givePermission($updateDriverAccountPerm);
                $admin->givePermission($updateDriverActivePerm);
                $admin->givePermission($exportDriverPerm);

                $admin->givePermission($viewTripPerm);
                $admin->givePermission($cancelTripPerm);
                $admin->givePermission($exportTripPerm);

                $admin->givePermission($viewDepositInvoicePerm);
                $admin->givePermission($createDepositInvoicePerm);
                $admin->givePermission($updateDepositInvoicePerm);
                $admin->givePermission($exportDepositInvoicePerm);

                $admin->givePermission($viewSuppportServicePerm);
                $admin->givePermission($updateSuppportServicePerm);

                $admin->givePermission($viewConfigPerm);
                $admin->givePermission($createConfigPerm);
                $admin->givePermission($updateConfigPerm);

                $admin->givePermission($viewQuestionPerm);
                $admin->givePermission($createQuestionPerm);
                $admin->givePermission($updateQuestionPerm);
                $admin->givePermission($deleteQuestionPerm);

                $admin->givePermission($viewAnswerPerm);
                $admin->givePermission($createAnswerPerm);
                $admin->givePermission($updateAnswerPerm);
                $admin->givePermission($deleteAnswerPerm);

                $admin->givePermission($viewNotificationPerm);
                $admin->givePermission($createNotificationPerm);
                $admin->givePermission($updateNotificationPerm);
                $admin->givePermission($deleteNotificationPerm);

                $admin->givePermission($viewDashboardPerm);

                $admin->givePermission($viewVehiclePerm);
                $admin->givePermission($exportVehiclePerm);
            }
            // partner role
            $operation_role = Role::where('name', 'Operation')->first();
            if(!isset($operation_role)) {
                $operation_role = Role::create([
                    'name' => 'operation',
                    'display_name' => 'Operation',
                    'type' => Role::TYPE_DISPLAY,
                    'status' => Role::STATUS_ACTIVE
                ]);
            }

            if(isset($operation_role)) {
                $operation_role->givePermission($viewDriverPerm);
                $operation_role->givePermission($confirmDriverFormPerm);
                $operation_role->givePermission($updateDriverAccountPerm);
                $operation_role->givePermission($updateDriverActivePerm);
                $operation_role->givePermission($exportDriverPerm);

                $operation_role->givePermission($viewTripPerm);
                $operation_role->givePermission($cancelTripPerm);
                $operation_role->givePermission($exportTripPerm);

                $operation_role->givePermission($viewDepositInvoicePerm);
                $operation_role->givePermission($createDepositInvoicePerm);
                $operation_role->givePermission($updateDepositInvoicePerm);
                $operation_role->givePermission($exportDepositInvoicePerm);

                $operation_role->givePermission($viewSuppportServicePerm);
                $operation_role->givePermission($updateSuppportServicePerm);

                $operation_role->givePermission($viewNotificationPerm);
                $operation_role->givePermission($createNotificationPerm);
                $operation_role->givePermission($updateNotificationPerm);
                $operation_role->givePermission($deleteNotificationPerm);

                $operation_role->givePermission($viewVehiclePerm);
                $operation_role->givePermission($exportVehiclePerm);
            }

            $accountant_role = Role::where('name', 'accountant')->first();
            if(!isset($accountant_role)) {
                $accountant_role = Role::create([
                    'name' => 'accountant',
                    'display_name' => 'Accountant',
                    'type' => Role::TYPE_DISPLAY,
                    'status' => Role::STATUS_ACTIVE
                ]);
            }

            if(isset($accountant_role)) {
                $accountant_role->givePermission($viewDriverPerm);
                $accountant_role->givePermission($exportDriverPerm);

                $accountant_role->givePermission($viewTripPerm);
                $accountant_role->givePermission($exportTripPerm);

                $accountant_role->givePermission($viewDepositInvoicePerm);
                $accountant_role->givePermission($exportDepositInvoicePerm);

                $accountant_role->givePermission($viewSuppportServicePerm);
                $accountant_role->givePermission($updateSuppportServicePerm);

                $accountant_role->givePermission($viewNotificationPerm);

                $accountant_role->givePermission($viewVehiclePerm);
                $accountant_role->givePermission($exportVehiclePerm);
            }

            $pogofdev = Employee::where('username', 'pogofdev')->first();
            if(!isset($pogofdev)) {
                $pogofdev = Employee::create([
                    'name' => 'pogofdev',
                    'reference' => $repo_employee->getReference(),
                    'username' => 'pogofdev',
                    'email' => 'pogofdev@admin.com',
                    'password' => bcrypt('admin123'),
                    'type' => Employee::TYPE_SUPER_ADMIN,
                    'uuid' => (string) Str::orderedUuid()
                ]);
            }
            $pogofdev->roles()->save($super);

            $admin_employee = Employee::where('username', 'cudidi_ceo')->first();
            if(!isset($admin_employee)) {
                $admin_employee = Employee::create([
                    'name' => 'Cudidi ceo',
                    'reference' => $repo_employee->getReference(),
                    'username' => 'cudidi_ceo',
                    'email' => 'ceo@cuvietnam.com.vn',
                    'password' => bcrypt('Cuvietnam123@'),
                    'type' => Employee::TYPE_NORMAL,
                    'uuid' => (string) Str::orderedUuid()
                ]);
            }
            $admin_employee->roles()->save($admin);

            $operation_employee = Employee::where('username', 'cudidi_ops')->first();
            if(!isset($operation_employee)) {
                $operation_employee = Employee::create([
                    'name' => 'Operation',
                    'reference' => $repo_employee->getReference(),
                    'username' => 'cudidi_ops',
                    'email' => 'ops@cuvietnam.com.vn',
                    'password' => bcrypt('Cuvietnam123@'),
                    'type' => Employee::TYPE_NORMAL,
                    'uuid' => (string) Str::orderedUuid()
                ]);
            }
            $operation_employee->roles()->save($operation_role);

            $accountant_employee = Employee::where('username', 'cudidi_admin')->first();
            if(!isset($accountant_employee)) {
                $accountant_employee = Employee::create([
                    'name' => 'Accountant',
                    'reference' => $repo_employee->getReference(),
                    'username' => 'cudidi_admin',
                    'email' => 'admin@cuvietnam.com.vn',
                    'password' => bcrypt('Cuvietnam123@'),
                    'type' => Employee::TYPE_NORMAL,
                    'uuid' => (string) Str::orderedUuid()
                ]);
            }
            $accountant_employee->roles()->save($accountant_role);
            // bo cong thuong
            $QLTK_employ = Employee::where('username', 'QLTK')->first();
            if(!isset($QLTK_employ)) {
                $QLTK_employ = Employee::create([
                    'name' => 'Bộ CT',
                    'reference' => $repo_employee->getReference(),
                    'username' => 'QLTK',
                    'email' => 'qltk@cuvietnam.com.vn',
                    'password' => bcrypt('QLTK123456'),
                    'type' => Employee::TYPE_NORMAL,
                    'uuid' => (string) Str::orderedUuid()
                ]);
            }
            $QLTK_employ->roles()->save($accountant_role);
            DB::commit();
        }
        catch (\Exception $e) {
            DB::rollBack();
            echo $e->getMessage();
        }
    }

    private function updatePermissionByRole($allPerms, $roleName) {
        $role = Role::where('name', $roleName)->first();
        if(isset($role)) {
            $role->permissions()->detach();
            $permission_ids = [];
            foreach($allPerms as $per) {
                array_push($permission_ids, $per->id);
            }
            if(count($permission_ids) > 0){
                $role->syncPermissions($permission_ids);
            }
        }
    }
}
