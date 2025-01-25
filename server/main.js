function doGet() {
  var userEmail = Session.getEffectiveUser().getEmail();
  console.log("userEmail", userEmail);

  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}

const print = () => {
  console.log("test", ALLOWED_USERS);
};
