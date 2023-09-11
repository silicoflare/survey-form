problemList = {
    "name": true,
    "prn": true,
    "srn": true,
    "email": true,
    "phone": true,
    "home": true,
    // "amenities": true,
    "rating-overall": true,
    "rating-amenities": true,
    "rating-teaching": true,
    "rating-syllabus": true,
    "rating-food": true,
    "rating-events": true,
}

function init()     {
    document.getElementById("name").addEventListener("input", validateName);
    document.getElementById("prn").addEventListener("input", validatePRN);
    document.getElementById("srn").addEventListener("input", validateSRN);
    document.getElementById("email").addEventListener("input", validateEmail);
    document.getElementById("phone").addEventListener("input", validatePhone);
}

function validateEmail() {
    const emailField = document.getElementById("email");
    const email = emailField.value;
    const re = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    if (re.test(email)) {
        problemList["email"] = false;
        emailField.style.backgroundColor = "#9cfc9c";
    } else {
        problemList["email"] = true;
        emailField.style.backgroundColor = "#fca4a4";
    }
}


function setCampus(value)
{
    var campusField = document.getElementById("campus");
    if (value == null)
    {
        campusField.value = '';
        campusField.style.border = "black solid 1px";
    }
    else
    {
        campusField.value = {
            '1': "Ring Road Campus",
            '2': "Electronics City Campus"
        }[value];
        campusField.style.border = "green solid 2px";
    }
}

function setBranch(value)
{
    var branchField = document.getElementById("branch");
    if (value == null)
    {
        branchField.value = '';
        branchField.style.border = "black solid 1px";
    }
    else
    {
        branchField.value = {
            'CS': "Computer Science Engineering",
            'AM': 'Computer Science (Artificial Intelligence and Machine Learning)',
            'ME': "Mechanical Engineering",
            'EE': "Electrical and Electronics Engineering",
            'EC': "Electronics and Communication Engineering",
            "CV": "Civil Engineering",
            "BT": "Biotechnology"
        }[value];
        branchField.style.border = "green solid 2px";
    }
}

function validateName()     {
    var nameField = document.getElementById("name")
    if (nameField.value.length > 0)
    {
        problemList["name"] = false;
        nameField.style.backgroundColor = "#9cfc9c";
    }
    else
    {
        problemList["name"] = true;
        nameField.style.backgroundColor = "#fca4a4";
    }
}

function validatePRN() {
    var prnField = document.getElementById("prn");
    var prn = prnField.value;
    var re = /PES[12]20(?:1[89]|2[0-2])[0-9]{5}/;  
    if (re.test(prn)) {
        problemList["prn"] = false;
        prnField.style.backgroundColor = "#9cfc9c";
    }
    else {
        problemList["prn"] = true;
        prnField.style.backgroundColor = "#fca4a4";
    }
}

function validateSRN() {
    var srnField = document.getElementById("srn");
    var srn = srnField.value;
    var re = /PES([12])[UP]G(?:1[89]|2[0-2])(AM|CS|EE|EC|CV|ME|BT)(?:00[1-9]|0[1-9][0-9]|[1-9][0-9]{2,})/;  
    if (re.test(srn)) {
        problemList["srn"] = false;
        srnField.style.backgroundColor = "#9cfc9c";
        var res = re.exec(srn);
        setCampus(res[1]);
        setBranch(res[2]);
    }
    else {
        problemList["srn"] = true;
        srnField.style.backgroundColor = "#fca4a4";
        setCampus(null);
        setBranch(null);
    }
}

function validateEmail() {
    var emailField = document.getElementById("email");
    var email = emailField.value;
    var re = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;  
    if (re.test(email)) {
        problemList["email"] = false;
        emailField.style.backgroundColor = "#9cfc9c";
    }
    else {
        problemList["email"] = true;
        emailField.style.backgroundColor = "#fca4a4";
    }
}

function validatePhone() {
    var phoneField = document.getElementById("phone");
    var phone = phoneField.value;
    var re = /[6-9]\d{9}/;  
    if (re.test(phone)) {
        problemList["phone"] = false;
        phoneField.style.backgroundColor = "#9cfc9c";
    }
    else {
        problemList["phone"] = true;
        phoneField.style.backgroundColor = "#fca4a4";
    }
}



function spark(field, points)
{
    if(points == -1)
    {
        spark(field, `${document.getElementById(`${field}-rating`).getAttribute('value')}`);
    }
    else
    {
        for(var i = 1; i <= 5; i++)
            document.getElementById(`${field}-${i}`).classList.remove(`checked-${field}`);
        for(var i = 1; i <= points; i++)
            document.getElementById(`${field}-${i}`).classList.add(`checked-${field}`);
    }
}

function select(field, points)
{
    document.getElementById(`${field}-rating`).setAttribute("value", `${points}`);
    // console.log(document.getElementById(`${field}-rating`).getAttribute('value'));
}

function resetAll()
{
    document.getElementById("form-da").reset();
    
    for(key in problemList)
        problemList[key] = true;

    ratingList = ["overall", "amenities", "teaching", "syllabus", "food", "events"];

    for (var rat of ratingList)
        for(i = 1; i <= 5; i++)
            document.getElementById(`${rat}-${i}`).classList.remove(`checked-${rat}`);
}

function giveResult()
{
    finalResults = {};

    for (x of ["name", "gender", "prn", "srn", "branch", "campus", "email", "phone"])
    {
        finalResults[x] = document.getElementById(x).value;
    }

    for (var x of document.getElementsByName("home"))
        if (x.checked)
            finalResults['home'] = x.id;

    ame = [];
    for (var x of document.getElementsByName("amenities"))
        if (x.checked)
            ame.push(x.id);
    
    finalResults['amenities'] = ame;

    ratingList = ["overall", "amenities", "teaching", "syllabus", "food", "events"];
    finalResults['ratings'] = {};
    for (x of ratingList)
        finalResults['ratings'][x] = document.getElementById(`${x}-rating`).getAttribute("value");

    alert("Form submitted successfully. Check console for form data.");
    console.log(JSON.stringify(finalResults, null, '\t'));
}




function submitStuff()
{
    ratingList = ["overall", "amenities", "teaching", "syllabus", "food", "events"];
    for(var rat of ratingList)
    {
        if (document.getElementById(`${rat}-rating`).getAttribute('value') != 0)
            problemList[`rating-${rat}`] = false;
    }   
    
    for (var x of document.getElementsByName("home"))
        if (x.checked)
            problemList['home'] = false;

    errors = [];
    for(key in problemList)
    {
        if(problemList[key])
            errors.push(key);
    }

    if (errors.length > 0)
    {
        errormsg = `Please fill the following fields:\n`;

        fieldNames = {
            "name": "Student Name",
            "prn": "PRN",
            "srn": "SRN",
            "email": "E-mail",
            "phone": "Phone Number",
            "studentType": "Student Type",
            "amenities": "Amenities",
            "rating-overall": "Overall Rating",
            "rating-amenities": "Amenities Rating",
            "rating-teaching": "Teaching Rating",
            "rating-syllabus": "Syllabus Rating",
            "rating-food": "Food Rating",
            "rating-events": "Events Rating",
        }

        for (var x of errors)
            errormsg += `${fieldNames[x]}\n`

        alert(errormsg);
    }
    else
    {
        giveResult();
    }
}