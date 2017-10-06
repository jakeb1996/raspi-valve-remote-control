$(document).ready(function() {
    /*constructor(props) {
           super(props);
           this.state = {
               // API details
               apiBaseUrl: 'https://mossbyte.com/api/v1/',
               appId: 'a28061dc-3a9a-4549-9d6b-0b5354e0af99',
               // Device details
               deviceConnected: false,
               deviceWriteKey: '9ef708ed-b216-4071-86e9-4950b3cc8962',
           };
       }*/

    var pnlDeviceConnector = $('#pnlDeviceConnector');
    var pnlScheduleList = $('#pnlScheduleList');
    var pnlScheduleModify = $('#pnlScheduleModify');

    var btnDeviceConnect = $('#btnDeviceConnect');
    var btnScheduleSave = $('#btnSaveSchedule');
    var btnNewSchedule = $('#btnNewSchedule');

    var apiBase = "https://mossbyte.com/api/v1/";
    var appKey = "a28061dc-3a9a-4549-9d6b-0b5354e0af99";
    var deviceId = "";

    var schedules = [];

    pnlDeviceConnector.hide();
    pnlScheduleList.hide();
    pnlScheduleModify.show();

    btnDeviceConnect.on('click', function() {
        var connectDeviceId = $('#txtDeviceId');

        if (connectDeviceId.val() != '') {
            $.get(apiBase + connectDeviceId.val())
                .done(function(data) {
                    deviceId = connectDeviceId.val();
                    pnlScheduleList.show();
                    pnlDeviceConnector.hide();
                })
                .fail(function(data) {
                    console.log('failed to find device');
                })
                .always(function(data) {
                    console.log(data);
                });
        } else {
            console.log('no device ID specified...');
        }
    });

    btnScheduleSave.on('click', function() {
        var txtStartTime = $('#txtStartTime');
        var txtRunTime = $('#txtRunTime');
        var lstDaysWeek = $('#lstDaysWeek');
        var lstMonths = $('#lstMonths');

        var startTimeRegex = new RegExp('([01]?[0-9]|2[0-3]):[0-5][0-9]');
        var runTimeRegex = new RegExp('^\\d+$');

        var passedValidation = true;

        if (!startTimeRegex.test(txtStartTime.val())) {
            passedValidation = false;
            txtStartTime.addClass('invalid');
        }

        if (!runTimeRegex.test(txtRunTime.val())) {
            passedValidation = false;
            txtRunTime.addClass('invalid');
        }

        if (!lstDaysWeek.val().length >= 1) {
            passedValidation = false;
            lstDaysWeek.addClass('invalid');
        }

        if (!lstMonths.val().length >= 1) {
            passedValidation = false;
            lstMonths.addClass('invalid');
        }

        if (passedValidation) {
            createSchedule(
                txtStartTime.val(),
                txtRunTime.val(),
                lstDaysWeek.val(),
                lstMonths.val()
            );
        }

        pnlScheduleModify.hide();
        updateScheduleListDisplay();
        pnlScheduleList.show();
    });

    btnNewSchedule.on('click', function() {
        pnlScheduleList.hide();
        pnlScheduleModify.show();
    });

    var updateScheduleListDisplay = function() {
        $('#scheduleDisplay').empty();
        schedules.map(function() {
            $('#scheduleDisplay').append('<div>test</div>');
        })
    };

    var createSchedule = function(startTime, runTime, daysWeek, months) {
        schedules.push({
            id: Date.now(),
            startTime: startTime,
            runTime: runTime,
            daysWeek: daysWeek,
            months: months
        })
    };

    removeSchedule = function(id) {
        schedules = $.grep(schedules, function(e){
            return e.id != id;
        });
    }
});