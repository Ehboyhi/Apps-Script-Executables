function buildAddOn(e) {
  const action = CardService.newAction().setFunctionName('runCalc');

  const button = CardService.newTextButton()
    .setText('Caluculate')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setOnClickAction(action);

  const section = CardService.newCardSection()
    .addWidget(button);

  return CardService.newCardBuilder()
    .addSection(section)
    .build();

}


function runCalc() {
  const threads = GmailApp.search('is:unread label:inbox');

  for (let i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var body = thread.getMessages()[0].getPlainBody();

    //Logger.log(thread.getMessages()[0].getPlainBody());

    if (body.includes("Calculate GPA")) {

      thread.reply("Your Current GPA for "
        + new Date()
        + "\n" + "Weigted: " 
        + calculateGPA(body, true)
        + "\n" + "Unweigted: "
        + calculateGPA(body, false));
      
      Logger.log("Email Sent?");

      break;
    }
  }

}

function calculateGPA (body, isWeighted) {
  var scoreSum = 0.0;
  lineList = body.split(/\r?\n/).filter(Boolean);

  lineList.splice(lineList.indexOf("Calculate GPA"), 1);
  lineList.splice(-3); //fix this later
  lineList.splice(0,1);

  apStart = lineList.indexOf("AP");

  Logger.log(lineList);

  for(let i = 0; i < lineList.length; i++){
    if(i < apStart && lineList[i] != "Calculate GPA") {
      scoreSum += convert(Number(lineList[i]));
    } else if (i > apStart) {
      scoreSum += convert(Number(lineList[i]));
      if(isWeighted){
        scoreSum += .67;
      }
    }
    Logger.log(scoreSum);
  }
  
  const gpa = scoreSum/6
  const finalGPA = gpa.toFixed(3);

  Logger.log("Final GPA " + finalGPA);

  return finalGPA;
}

function convert(score) {
  if(score >= 93.5){
    return 4.0;
  } else if (score >= 89.5) {
    return 3.7;
  } else if (score >= 86.5) {
    return 3.3;
  } else if (score >= 82.5) {
    return 3.0;
  } else if (score >= 79.5) {
    return 2.7;
  } else if (score >= 76.5) {
    return 2.3;
  } else if (score >= 72.5) {
    return 2.0;
  } else if (score >= 69.5) {
    return 1.7;
  }
}




