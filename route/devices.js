var session;

exports.view = function(req, res, next){
    session = req.session;

    var admin = require("firebase-admin");
    var db = admin.database();
    var userDeviceRef = db.ref("/users/"+session.uid+"/devices");
    var deviceRef = db.ref("/devices/");
    var devicesArray = [];
    var deviceName = [];
    var devicePicURL = [];
    var batteryPercentage = [];
    var deviceSerial = [];
    var deviceBatteryLife = [];
    var deviceChargingState = [];

    console.log("\nCurrently in devices.js view.");
    userDeviceRef.once("value", function(snapshot){

        console.log("Entering snapshot of user's devices.");

        if(snapshot.val()){

            console.log("User's device snapshot found.");

            devicesArray = snapshot.val().split(',');
            console.log("User owns devices: " + devicesArray);

            for(i = 0; i < devicesArray.length; i++){
                deviceSerial = deviceSerial.concat(devicesArray[i]);

                deviceRef.child(devicesArray[i]).child("name").once("value", function(snapshot){
                    deviceName = deviceName.concat(snapshot.val());
                    console.log("\nConcating device name: " + snapshot.val());
                });

                deviceRef.child(devicesArray[i]).child("picURL").once("value", function(snapshot){
                    devicePicURL = devicePicURL.concat(snapshot.val());
                    console.log("Concating device picture url: " + snapshot.val());
                });

                deviceRef.child(devicesArray[i]).child("batteryLife").once("value", function(snapshot){
                    deviceBatteryLife = deviceBatteryLife.concat(snapshot.val());
                    console.log("Concating device picture url: " + snapshot.val());
                });

                deviceRef.child(devicesArray[i]).child("chargingState").once("value", function(snapshot){
                    deviceChargingState = deviceChargingState.concat(snapshot.val());
                    console.log("Concating device picture url: " + snapshot.val());
                });

                deviceRef.child(devicesArray[i]).child("batteryPercent").once("value", function(snapshot){
                    batteryPercentage = batteryPercentage.concat(snapshot.val());
                    console.log("Concating device battery percentage : " + snapshot.val());
                });
            }
        }

        setTimeout(function(){
            console.log("The user owns devices: ", deviceName);
            console.log("The devices' Pic URL: : ", devicePicURL);
            console.log("The devices' Battery Percentage: : ", devicePicURL);
            res.render('devices', {userName: session.name, userEmail: session.email, deviceName: deviceName, deviceSerial: deviceSerial, devicePicURL: devicePicURL, batteryPercentage: batteryPercentage, deviceBatteryLife: deviceBatteryLife, deviceChargingState: deviceChargingState});
        }, 1000);

    }).catch(function(error){
        console.log("Error fetching data", error);
        res.send(error + "\nUser might not own any devices");
    });

}

exports.load = function(req, res, next){
    console.log("\nCurrently in devices.js.");
    session = req.session;
    req.session.tag = "devices";
    res.end();
    console.log("Exiting devices.js.");
}