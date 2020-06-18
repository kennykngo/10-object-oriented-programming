const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const memberArr = [];

genEmployee = () => {
  inquirer
    .prompt([
      {
        name: "chooseMember",
        type: "list",
        message: "Choose the role of the team member",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        name: "memberName",
        type: "input",
        message: "Provide your full name",
      },
      {
        name: "memberEmail",
        type: "input",
        message: "Please provide your email address",
      },
      {
        name: "memGithub",
        type: "input",
        message: "Provide your username for Github.",
        when: (ans) => ans.chooseMember === "Engineer",
      },
      {
        name: "memSchool",
        type: "input",
        message: "Provide your university's name.",
        when: (ans) => ans.chooseMember === "Intern",
      },
      {
        name: "officeNumber",
        type: "input",
        message: "Provide your office number.",
        when: (ans) => ans.chooseMember === "Manager",
      },
    ])
    .then((res) => {
      var id = 0;
      if (res.chooseMember === "Engineer") {
        memberArr.push(
          new Engineer(res.memberName, id, res.memberEmail, res.memGithub)
        );
        id++;
      } else if (res.chooseMember === "Intern") {
        memberArr.push(
          new Intern(res.memberName, res.id, res.memberEmail, res.memSchool)
        );
        id++;
      } else {
        memberArr.push(
          new Manager(res.memberName, res.id, res.memberEmail, res.officeNumber)
        );
      }
      console.log(res);
      inquirer
        .prompt({
          name: "addMember",
          type: "confirm",
          message: "Do you want to add another teammate?",
        })
        .then((res) => {
          if (res.addMember) {
            genEmployee();
          } else
            fs.writeFile("team.html", render(memberArr), (err) => {
              if (err) throw err;
              else console.log("Team generated");
            });
        });
    });
};

genEmployee();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
