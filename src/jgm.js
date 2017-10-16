var cronParser = require('cron-parser');
var moment = require('moment');
var cronstrue = require('cronstrue');

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
    var pnlSchedulePreview = $('#pnlSchedulePreview');

    var btnDeviceConnect = $('#btnDeviceConnect');
    var btnScheduleSave = $('#btnSaveSchedule');
    var btnSchedulePreview = $('#btnPreviewSchedule');
    var btnNewSchedule = $('#btnNewSchedule');
    var btnScheduleUpload = $('#btnUploadSchedule');
    var btnDisconnect = $('#btnDisconnect');
    var btnScheduleBack = $('#btnScheduleBack');

    var txtStartTime = $('#txtStartTime');
    var txtRunTime = $('#txtRunTime');
    var txtConnectDeviceId = $('#txtConnectDeviceId');
    var lstDaysWeek = $('#lstDaysWeek');
    var lstMonths = $('#lstMonths');

    var apiBase = "https://mossbyte.com/api/v1/";
    var deviceId = "";

    var schedules = [];

    pnlDeviceConnector.show();
    pnlScheduleList.hide();
    pnlScheduleModify.hide();

    btnDeviceConnect.on('click', function() {
        if (txtConnectDeviceId.val() != '') {
            $.get(apiBase + txtConnectDeviceId.val())
                .done(function(data) {
                    deviceId = txtConnectDeviceId.val();

                    schedules = data.data.mossByte.object[0];
                    console.log(schedules);
                    updateScheduleListDisplay();

                    pnlScheduleList.show();
                    pnlDeviceConnector.hide();
                })
                .fail(function(data) {
                    Materialize.toast('Hmm, that device could not be found', 4000);
                })
                .always(function(data) {
                    console.log(data);
                });
        } else {
            Materialize.toast('You need to specify the device ID...', 4000);
        }
    });

    btnDisconnect.on('click', function() {
        pnlDeviceConnector.show();
        pnlScheduleList.hide();
        pnlScheduleModify.hide();
        deviceId = "";
        schedules = [];
    });

    btnScheduleSave.on('click', function() {
        var passedValidation = scheduleValidation();

        if (passedValidation) {
            var schedule = createSchedule(
                txtStartTime.val(),
                txtRunTime.val(),
                lstDaysWeek.val(),
                lstMonths.val()
            );

            pnlScheduleModify.hide();
            updateScheduleListDisplay();
            pnlScheduleList.show();
        }
    });

    btnScheduleBack.on('click', function() {
        pnlDeviceConnector.hide();
        pnlScheduleList.show();
        pnlScheduleModify.hide();

        txtStartTime.val("");
        txtRunTime.val("");
        lstDaysWeek.val("");
        lstMonths.val("");
    });

    btnSchedulePreview.on('click', function() {
        if (scheduleValidation()) {
            try {
                pnlSchedulePreview.empty();
                pnlSchedulePreview.hide(200);
                var cron = cronParser.parseExpression(constructCronExpression(txtStartTime.val(), lstDaysWeek.val(), lstMonths.val()));
                for (var i = 0; i < 10; i++) {
                    var datetime = new Date(cron.next().toString());
                    pnlSchedulePreview.append(moment(datetime).format('MMMM Do YYYY h:mm a') + '<br />');
                }
                pnlSchedulePreview.show(200);
            } catch (err) {
                pnlSchedulePreview.append('<br />Failed to generate preview');
                console.log(err);
            }
        }
    });

    var scheduleValidation = function() {
        var startTimeRegex = new RegExp('([01]?[0-9]|2[0-3]):[0-5][0-9]');
        var runTimeRegex = new RegExp('^\\d+$');

        var passedValidation = true;

        // Validate start time
        if (!startTimeRegex.test(txtStartTime.val())) {
            passedValidation = false;
            txtStartTime.addClass('invalid');
        } else {
            txtStartTime.removeClass('invalid');
        }

        // Validate duration
        if (!runTimeRegex.test(txtRunTime.val())) {
            passedValidation = false;
            txtRunTime.addClass('invalid');
        } else {
            txtRunTime.removeClass('invalid');
        }

        // Validate the list of days selected
        if (!lstDaysWeek.val().length >= 1) {
            passedValidation = false;
            lstDaysWeek.addClass('invalid');
        } else {
            lstDaysWeek.removeClass('invalid');
        }

        // Validate the list of months selected
        if (!lstMonths.val().length >= 1) {
            passedValidation = false;
            lstMonths.addClass('invalid');
        } else {
            lstMonths.removeClass('invalid');
        }

        return passedValidation;
    }

    btnNewSchedule.on('click', function() {
        pnlScheduleList.hide();
        pnlScheduleModify.show();
    });

    btnScheduleUpload.on('click', function() {
        uploadSchedule();
    })

    var updateScheduleListDisplay = function() {
        //https://stackoverflow.com/questions/18673860/defining-a-html-template-to-append-using-jquery
        $('#scheduleDisplay').hide(200);
        $('#scheduleDisplay').empty().append('<ul>').addClass('collection');
        schedules.forEach(function (schedule) {
            var cronExp = constructCronExpression(schedule.startTime, schedule.daysWeek, schedule.months);
            $('#scheduleDisplay ul').append('<li class="collection-item"><div>'+cronstrue.toString(cronExp) + ' (' + schedule.runTime + ' mins)<a href="#!" class="secondary-content"><i class="material-icons">delete_forever</i></a></div></li>');
        })

        $('#scheduleDisplay ul li div a').on('click', function() {
            schedules.splice($(this.parentNode.parentNode).index(), 1);
            updateScheduleListDisplay();
        });

        $('#scheduleDisplay').show(200);
    };

    var constructCronExpression = function(txtStartTime, lstDaysWeek, lstMonths) {
        var startTimeSplit = txtStartTime.split(':');
        var lstDaysWeek = lstDaysWeek.join(',');
        var lstMonths = lstMonths.join(',');
        return (startTimeSplit[1] + ' ' + startTimeSplit[0] + ' * ' + lstMonths + ' ' + lstDaysWeek);
    }

    var createSchedule = function(startTime, runTime, daysWeek, months) {
        var schedule = {
            id: Date.now(),
            startTime: startTime,
            runTime: runTime,
            daysWeek: daysWeek,
            months: months
        };

        schedules.push(schedule);

        return schedule.id;
    };

    var uploadSchedule = function() {
        if (deviceId != '') {
            var msgUploading = Materialize.toast('Uploading...', 4000);
            $.ajax({
                type: 'PUT',
                url: apiBase + deviceId,
                data: {
                    object: [
                        schedules
                    ]
                }
            })
                .done(function(data) {
                    msgUploading.remove();
                    Materialize.toast('Uploaded!', 4000);
                })
                .fail(function(data) {
                    msgUploading.remove();
                    Materialize.toast('Oops, something went wrong!', 4000)
                })
                .always(function(data) {
                    console.log(data);
                });
        } else {
             Materialize.toast('You have not yet specified a device...', 4000)
        }
    }

    removeSchedule = function(id) {
        schedules = $.grep(schedules, function(e){
            return e.id != id;
        });
    }
});