const mqtt = require("mqtt");
const { exec } = require("child_process");
const client = mqtt.connect("mqtt://test.mosquitto.org");

const topicToSub = 'ios/test'
const testingMessage = 'testing-shutdown'

client.on("connect", () => {
  client.subscribe("ios/test", (err) => {
    if (!err) {
      client.publish("ios/test", "Hello mqtt");
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(topic);
  if(topic === topicToSub && message.toString()===testingMessage){
    console.log("inside");
    exec("cmd /c  test.bat", (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing batch file: ${error}`);
          return;
        }
      
        if (stderr) {
          console.error(`Error output: ${stderr}`);
          return;
        }
      
        console.log(`Batch file output: ${stdout}`);
      });
  }
  console.log(message.toString());
//   client.end();
});