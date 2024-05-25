<?php

use App\Http\Controllers\API\ConfigApiController;
use App\Http\Controllers\API\DriverApiController;
use App\Http\Controllers\API\MediaApiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\OtpAttemptApiController;
use App\Http\Controllers\API\EmployeeApiController;
use App\Http\Controllers\API\RoleApiController;
use App\Http\Controllers\API\DriverFormApiController;
use App\Http\Controllers\API\VehicleFormApiController;
use App\Http\Controllers\API\VehicleBrandApiController;
use App\Http\Controllers\API\VehicleTypeApiController;
use App\Http\Controllers\API\VehicleBrandModelApiController;
use App\Http\Controllers\API\PassengerApiController;
use App\Http\Controllers\API\AddressApiController;
use App\Http\Controllers\API\EmployeeReportApiController;
use App\Http\Controllers\API\TripApiController;
use App\Http\Controllers\API\RatingApiController;
use App\Http\Controllers\API\DepositInvoiceApiController;
use App\Http\Controllers\API\LocationApiController;
use App\Http\Controllers\API\SupportApiController;
use App\Http\Controllers\API\UserCommentApiController;
use App\Http\Controllers\API\InvoiceApiController;
use App\Http\Controllers\API\QuestionApiController;
use App\Http\Controllers\API\AnswerApiController;
use App\Http\Controllers\API\TripCardApiController;
use App\Http\Controllers\API\VehicleApiController;
use App\Http\Controllers\API\NotificationApiController;
use App\Http\Controllers\API\AgencyApiController;
use App\Http\Controllers\API\RegionApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
/*
 * sample route
Route::group(['prefix' => 'base'], function(){
    Route::get('/findAll', [BaseApiController::class, 'findAll']);
    Route::post('/store', [BaseApiController::class, 'store']);
    Route::post('/update/{id}', [BaseApiController::class, 'update']);
    Route::get('/findById/{id}', [BaseApiController::class, 'findById']);
    Route::delete('/destroy/{id}', [BaseApiController::class, 'destroy']);
    Route::post('/search', [BaseApiController::class, 'search']);
    Route::post('/dict/getDictByIds', [BaseApiController::class, 'getDictByIds']);
    Route::post('/dict/getDictByColumns', [BaseApiController::class, 'getDictByColumns']);
});
*/
// local call
Route::group(['prefix' => 'v1'], function () {
    // passenger api
    Route::group(['prefix' => 'employees', ['middleware' => ['auth:api']]], function(){
        Route::get('/findAll', [EmployeeApiController::class, 'findAll']);
        Route::post('/store', [EmployeeApiController::class, 'store']);
        Route::post('/update/{id}', [EmployeeApiController::class, 'update']);
        Route::get('/findById/{id}', [EmployeeApiController::class, 'findById']);
        Route::delete('/destroy/{id}', [EmployeeApiController::class, 'destroy']);
        Route::post('/search', [EmployeeApiController::class, 'search']);
        Route::post('/dict/getDictByIds', [EmployeeApiController::class, 'getDictByIds']);
        Route::post('/dict/getDictByColumns', [EmployeeApiController::class, 'getDictByColumns']);
        Route::post('/exportExcel', [EmployeeReportApiController::class, 'exportExcel']);
    });
    // otp_attemps api
    Route::group(['prefix' => 'otp_attemps'], function(){
        Route::get('/findAll', [OtpAttemptApiController::class, 'findAll']);
        Route::post('/store', [OtpAttemptApiController::class, 'store']);
        Route::post('/update/{id}', [OtpAttemptApiController::class, 'update']);
        Route::get('/findById/{id}', [OtpAttemptApiController::class, 'findById']);
        Route::delete('/destroy/{id}', [OtpAttemptApiController::class, 'destroy']);
        Route::post('/search', [OtpAttemptApiController::class, 'search']);
        Route::post('/dict/getDictByIds', [OtpAttemptApiController::class, 'getDictByIds']);
        Route::post('/dict/getDictByColumns', [OtpAttemptApiController::class, 'getDictByColumns']);
    });
    // roles api
    Route::group(['prefix' => 'roles', ['middleware' => ['auth:api']]], function(){
        Route::get('/findAll', [RoleApiController::class, 'findAll']);
        Route::post('/store', [RoleApiController::class, 'store']);
        Route::post('/update/{id}', [RoleApiController::class, 'update']);
        Route::get('/findById/{id}', [RoleApiController::class, 'findById']);
        Route::delete('/destroy/{id}', [RoleApiController::class, 'destroy']);
        Route::post('/search', [RoleApiController::class, 'search']);
        Route::post('/dict/getDictByIds', [RoleApiController::class, 'getDictByIds']);
        Route::post('/dict/getDictByColumns', [RoleApiController::class, 'getDictByColumns']);
    });

    // roles api
    Route::group(['prefix' => 'configs', 'middleware' => ['auth.local.api']], function(){
        Route::get('/findAll', [ConfigApiController::class, 'findAll']);
        Route::post('/store', [ConfigApiController::class, 'store']);
        Route::post('/update/{id}', [ConfigApiController::class, 'update']);
        Route::get('/findById/{id}', [ConfigApiController::class, 'findById']);
        Route::delete('/destroy/{id}', [ConfigApiController::class, 'destroy']);
        Route::post('/search', [ConfigApiController::class, 'search']);
        Route::post('/dict/getDictByIds', [ConfigApiController::class, 'getDictByIds']);
        Route::post('/getOneBy', [ConfigApiController::class, 'getOneBy']);
        Route::post('/getDictByTypes', [ConfigApiController::class, 'getDictByTypes']);
    });
});
// external call
Route::group(['prefix' => 'cmsService'], function () {
    Route::group(['prefix' => 'v1'], function () {

        Route::group(['prefix' => 'roles'], function() {
            Route::group(['middleware' => ['auth:api']], function() {
                Route::get('/findAll', [RoleApiController::class, 'findAll'])->middleware('permission:view-role');
                Route::post('/store', [RoleApiController::class, 'store'])->middleware('permission:create-role');
                Route::post('/update/{id}', [RoleApiController::class, 'update'])->middleware('permission:update-role');
                Route::get('/findById/{id}', [RoleApiController::class, 'findById'])->middleware('permission:view-role');
                Route::delete('/destroy/{id}', [RoleApiController::class, 'destroy'])->middleware('permission:delete-role');
                Route::post('/search', [RoleApiController::class, 'search'])->middleware('permission:view-role');
            });
        });

        Route::group(['prefix' => 'employees'], function(){
            // use for login
            Route::post('/loginWithPassword', [EmployeeApiController::class, 'loginWithPassword']);
            Route::post('/checkVersion', [EmployeeApiController::class, 'checkVersion']);

            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/loginWithToken', [EmployeeApiController::class, 'loginWithToken']);
                Route::post('/changePassword', [EmployeeApiController::class, 'changePassword']);
                Route::post('/logout', [EmployeeApiController::class, 'logout']);
            });
        });

        Route::group(['prefix' => 'drivers'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [DriverApiController::class, 'search'])->middleware('permission:view-driver');
                Route::post('/searchDriver', [DriverApiController::class, 'searchDriver'])->middleware('permission:view-driver');
                Route::post('/confirmForm', [DriverApiController::class, 'confirmForm'])->middleware('permission:view-driver');
                Route::post('/setReceiveRide', [DriverApiController::class, 'setReceiveRide'])->middleware('permission:update-driver-active');
                Route::post('/updateStatus', [DriverApiController::class, 'updateStatus'])->middleware('permission:update-driver-account');
                Route::post('/changeDriverType', [DriverApiController::class, 'changeDriverType'])->middleware('permission:update-driver-account');
                Route::post('/exportExcel', [DriverApiController::class, 'exportExcel'])->middleware('permission:export-driver');
                Route::post('/exportExcelNew', [DriverApiController::class, 'exportExcelNew'])->middleware('permission:export-driver');
                Route::get('/reportByMonth', [DriverApiController::class, 'reportByMonth']);
                Route::post('/updateAgency', [DriverApiController::class, 'updateAgency'])->middleware('permission:update-driver-agency');
            });
        });

        Route::group(['prefix' => 'driver_forms'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [DriverFormApiController::class, 'search'])->middleware('permission:view-driver');
                Route::post('/verifiedForm', [DriverFormApiController::class, 'verifiedForm'])->middleware('permission:confirm-driver-form');
                Route::post('/verifiedFormList', [DriverFormApiController::class, 'verifiedFormList'])->middleware('permission:confirm-driver-form');
            });
        });

        Route::group(['prefix' => 'vehicle_forms'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [VehicleFormApiController::class, 'search'])->middleware('permission:view-vehicle');
                Route::post('/verifiedForm', [VehicleFormApiController::class, 'verifiedForm'])->middleware('permission:confirm-driver-form');
                Route::post('/verifiedFormList', [VehicleFormApiController::class, 'verifiedFormList'])->middleware('permission:confirm-driver-form');
            });
        });

        Route::group(['prefix' => 'passengers'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [PassengerApiController::class, 'search'])->middleware('permission:view-passenger');
                Route::post('/updateStatus', [PassengerApiController::class, 'updateStatus'])->middleware('permission:update-passenger');
                Route::post('/exportExcel', [PassengerApiController::class, 'exportExcel'])->middleware('permission:export-passenger');
                Route::get('/reportByMonth', [PassengerApiController::class, 'reportByMonth']);
            });
        });

        Route::group(['prefix' => 'address'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [AddressApiController::class, 'search'])->middleware('permission:view-passenger-address');
            });
        });

        Route::group(['prefix' => 'vehicle_brands'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [VehicleBrandApiController::class, 'search'])->middleware('permission:view-driver');
            });
        });

        Route::group(['prefix' => 'vehicle_brand_models'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [VehicleBrandModelApiController::class, 'search'])->middleware('permission:view-driver');
            });
        });

        Route::group(['prefix' => 'vehicle_types'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [VehicleTypeApiController::class, 'search'])->middleware('permission:view-driver');
            });
        });

        Route::group(['prefix' => 'trip'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [TripApiController::class, 'search'])->middleware('permission:view-trip');
                Route::post('/exportExcel', [TripApiController::class, 'exportExcel'])->middleware('permission:export-trip');
                Route::post('/cancelTripCms', [TripApiController::class, 'cancelTripCms'])->middleware('permission:cancel-trip');
            });
        });

        Route::group(['prefix' => 'trip_cards'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::get('/reportMonthly', [TripCardApiController::class, 'reportMonthly']);
                Route::get('/reportMonthlyTotalTrip', [TripCardApiController::class, 'reportMonthlyTotalTrip']);
                Route::get('/reportMonthlyTotalPaid', [TripCardApiController::class, 'reportMonthlyTotalPaid']);
                Route::post('/reportTotalPaid', [TripCardApiController::class, 'reportTotalPaid']);
                Route::post('/reportTotalTrip', [TripCardApiController::class, 'reportTotalTrip']);
            });
        });

        Route::group(['prefix' => 'rating'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [RatingApiController::class, 'search'])->middleware('permission:view-rating-review');
                Route::post('/exportExcel', [RatingApiController::class, 'exportExcel'])->middleware('permission:export-rating-review');
                Route::post('/reportRating', [RatingApiController::class, 'reportRating']);
            });
        });

        Route::group(['prefix' => 'locations'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/getTripTracker', [LocationApiController::class, 'getTripTracker'])->middleware('permission:view-trip');
            });
        });

        Route::group(['prefix' => 'deposit_invoice'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [DepositInvoiceApiController::class, 'search'])->middleware('permission:view-deposit-invoice');
                Route::post('/store', [DepositInvoiceApiController::class, 'store'])->middleware('permission:create-deposit-invoice');
                Route::post('/confirm', [DepositInvoiceApiController::class, 'confirm'])->middleware('permission:update-deposit-invoice');
                Route::post('/exportExcel', [DepositInvoiceApiController::class, 'exportExcel'])->middleware('permission:export-deposit-invoice');
            });
        });

        Route::group(['prefix' => 'configs'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [ConfigApiController::class, 'search'])->middleware('permission:view-config');
                Route::get('/findById/{id}', [ConfigApiController::class, 'findById'])->middleware('permission:view-config');
                Route::post('/store', [ConfigApiController::class, 'store'])->middleware('permission:create-config');
                Route::post('/update/{id}', [ConfigApiController::class, 'update'])->middleware('permission:update-config');
                Route::delete('/destroy/{id}', [ConfigApiController::class, 'destroy']);
            });
            Route::get('/findAllApp', [ConfigApiController::class, 'findAllApp']);
        });

        Route::group(['prefix' => 'employees'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [EmployeeApiController::class, 'search'])->middleware('permission:view-employee');
                Route::get('/findById/{id}', [EmployeeApiController::class, 'findById'])->middleware('permission:view-employee');
                Route::post('/store', [EmployeeApiController::class, 'store'])->middleware('permission:create-employee');
                Route::post('/update/{id}', [EmployeeApiController::class, 'update'])->middleware('permission:update-employee');
                Route::delete('/destroy/{id}', [EmployeeApiController::class, 'destroy'])->middleware('permission:delete-employee');

                Route::get('/getPermission', [EmployeeApiController::class, 'getPermission']);

                Route::post('/exportExcel', [EmployeeReportApiController::class, 'exportExcel'])->middleware('permission:export-employee');
            });
        });

        Route::group(['prefix' => 'supports'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [SupportApiController::class, 'search'])->middleware('permission:view-support-service');
                Route::post('/updateStatus', [SupportApiController::class, 'updateStatus'])->middleware('permission:update-support-service');
                Route::post('/exportExcel', [SupportApiController::class, 'exportExcel'])->middleware('permission:view-support-service');
            });
        });

        Route::group(['prefix' => 'user_comments'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [UserCommentApiController::class, 'search'])->middleware('permission:view-support-service');
                Route::post('/sendMessage', [UserCommentApiController::class, 'sendMessage'])->middleware('permission:update-support-service');
            });
        });

        Route::group(['prefix' => 'invoices'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [InvoiceApiController::class, 'search'])->middleware('permission:view-invoice');
                Route::post('/exportExcel', [InvoiceApiController::class, 'exportExcel'])->middleware('permission:export-invoice');
            });
        });

        Route::group(['prefix' => 'questions'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [QuestionApiController::class, 'search'])->middleware('permission:view-question');
                Route::get('/findById/{id}', [QuestionApiController::class, 'findById'])->middleware('permission:view-question');
                Route::post('/store', [QuestionApiController::class, 'store'])->middleware('permission:create-question');
                Route::post('/update/{id}', [QuestionApiController::class, 'update'])->middleware('permission:update-question');
                Route::delete('/destroy/{id}', [QuestionApiController::class, 'destroy'])->middleware('permission:delete-question');
            });
        });

        Route::group(['prefix' => 'answers'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [AnswerApiController::class, 'search'])->middleware('permission:view-answer');
                Route::get('/findById/{id}', [AnswerApiController::class, 'findById'])->middleware('permission:view-answer');
                Route::post('/store', [AnswerApiController::class, 'store'])->middleware('permission:create-answer');
                Route::post('/update/{id}', [AnswerApiController::class, 'update'])->middleware('permission:update-answer');
                Route::delete('/destroy/{id}', [AnswerApiController::class, 'destroy'])->middleware('permission:delete-answer');
            });
        });

        Route::group(['prefix' => 'notifications'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [NotificationApiController::class, 'search'])->middleware('permission:view-notification');
                Route::get('/findById/{id}', [NotificationApiController::class, 'findById'])->middleware('permission:view-notification');
                Route::post('/store', [NotificationApiController::class, 'store'])->middleware('permission:create-notification');
                Route::post('/update/{id}', [NotificationApiController::class, 'update'])->middleware('permission:update-notification');
                Route::delete('/destroy/{id}', [NotificationApiController::class, 'destroy'])->middleware('permission:delete-notification');
            });
        });

        Route::group(['prefix' => 'vehicles'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [VehicleApiController::class, 'search'])->middleware('permission:view-vehicle');
                Route::post('/exportExcel', [VehicleApiController::class, 'exportExcel'])->middleware('permission:export-vehicle');
                Route::post('/exportInsuranceExcel', [VehicleApiController::class, 'exportInsuranceExcel'])->middleware('permission:export-vehicle');
            });
        });

        Route::group(['prefix' => 'media'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/replaceMedia', [MediaApiController::class, 'replaceMedia']);
                Route::post('/rotateMedia', [MediaApiController::class, 'rotateMedia']);
            });
        });

        Route::group(['prefix' => 'agencies'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [AgencyApiController::class, 'search']);
            });
        });

        Route::group(['prefix' => 'regions'], function(){
            Route::group(['middleware' => ['auth:api']], function(){
                Route::post('/search', [RegionApiController::class, 'search']);
            });
        });
    });
});

Route::group(['prefix' => 'cmsService'], function () {

});
