//import firebase functions modules
const functions = require('firebase-functions');
//import admin module
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// Listens for new Announcements added to Announcements/:pushId
exports.sendAnnouncementNotification= functions.database.ref('/Announcements/{pushId}')
    .onWrite((change, context) => {
      // Only edit data when it is first created.
      if (change.before.exists()) {
        return null;
      }
      // Exit when the data is deleted.
      if (!change.after.exists()) {
        return null;
      }
      // Grab the current value of what was written to the Realtime Database.
      const announcement = change.after.val();
      console.log('Sending Announcement notification', context.params.pushId, announcement);

      // Create a notification
      const payload = {
            data: {
              acategory:announcement.category,
              adescription:announcement.description,
              aimage:announcement.imageurl,
              apostedby:announcement.postedBy,
              aposteddate:announcement.postedDate,
              arelevance:announcement.relevance,
              activity:"Announcements"
            }
        };


  //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };


    return admin.messaging().sendToTopic("AnnouncementsAlerts", payload, options);
});



// Listens for new Events added to Events/:name
exports.sendEventNotification= functions.database.ref('/Events/{name}')
    .onWrite((change, context) => {
      // Only edit data when it is first created.
      if (change.before.exists()) {
        return null;
      }
      // Exit when the data is deleted.
      if (!change.after.exists()) {
        return null;
      }
      // Grab the current value of what was written to the Realtime Database.
      const event= change.after.val();
      console.log('Sending Event notification', context.params.pushId, event);

  // Create a notification
  const payload = {
        data: {

          ename:event.name,
          edescription:event.description,
          eimage:event.image,
          ecategory:event.category,
          ecd:event.cd,
          ecn:event.cn,
          ece:event.ce,
          edate:event.date,
          epostedAt:event.postedAt,
          ereg:event.reg,
          etime:event.time,
          evenue:event.venue,
          erelevance:event.relevance,
          eregbtndesc:event.regbtndesc,
          activity:"Events"
        }
    };

  //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };


    return admin.messaging().sendToTopic("EventsAlerts", payload, options);
});


// Listens for new Events added to Events/:name
exports.sendClubNotification= functions.database.ref('/StudentClubs/{name}')
    .onWrite((change, context) => {
      // Only edit data when it is first created.
      if (change.before.exists()) {
        return null;
      }
      // Exit when the data is deleted.
      if (!change.after.exists()) {
        return null;
      }
      // Grab the current value of what was written to the Realtime Database.
      const club= change.after.val();
      console.log('Sending Club notification', context.params.pushId, club);

  // Create a notification
  const payload = {
        data: {

          cname:club.name,
          cdescription:club.description,
          cimage:club.image,
          cactivities:club.activities,
          cpoc:club.poc,
          cteam:club.team,
          crelevence:club.relevance,
          cinfolink:club.infolink,
          activity:"Clubs"
        }
    };

  //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };


    return admin.messaging().sendToTopic("ClubsAlerts", payload, options);
});


// Listens for new Announcements added to Announcements/:pushId
exports.sendNewsNotification= functions.database.ref('/Campus News/{pushId}')
    .onWrite((change, context) => {
      // Only edit data when it is first created.
      if (change.before.exists()) {
        return null;
      }
      // Exit when the data is deleted.
      if (!change.after.exists()) {
        return null;
      }
      // Grab the current value of what was written to the Realtime Database.
      const news = change.after.val();
      console.log('Sending News notification', context.params.pushId, news);

      // Create a notification
      const payload = {
            data: {
              nheadline:news.headline,
              ncontent:news.content,
              ncategory:news.category,
              nimage:news.image,
              nposteddate:news.postedAt,
              npostedby:news.postedBy,
              activity:"News"
            }
        };


  //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };


    return admin.messaging().sendToTopic("NewsAlerts", payload, options);
});
