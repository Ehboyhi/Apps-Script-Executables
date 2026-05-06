function sendReminder() {

  try{
    var label = GmailApp.getUserLabelByName("(Things to remember/do)");
    var testThread = label.getThreads();
    console.log("try completed");
  }catch{
    GmailApp.createLabel("(Things to remember/do)");
    console.log("Label Created!");
    MailApp.sendEmail(Session.getActiveUser().getEmail(), "Label Synthesis Alert", "A new label has been created.");
    return 0;
  }
    //var label = GmailApp.getUserLabelByName("(Things to remember/do)"); 
    var numEmails = 0;
    var threads = label.getThreads();
    var finalMessage = "";
    const messages = [];
    
    threads.forEach(thread => {
      if(thread.isUnread()){
        numEmails++;
        finalMessage = finalMessage + (" " + thread.getFirstMessageSubject() + "\n");
      }
      });

    if(numEmails > 0){
      MailApp.sendEmail(Session.getActiveUser().getEmail(), "Email Reminder", finalMessage);
    }

    console.log("Reminder sent!");
  
}
