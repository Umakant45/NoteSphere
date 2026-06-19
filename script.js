

function downloadNote(subject){

  let unit = prompt(
    "Enter Unit Number"
  );

  const notes = {

    "Java": {
      1: "pdfs/java/java-unit-1.pdf",
      2: "pdfs/java/java-unit-2.pdf",
      3: "pdfs/java/java-unit-3.pdf",
      4: "pdfs/java/java-unit-4.pdf"
    },

    "Python": {
      1: "pdfs/python/python-unit-1.pdf",
      2: "pdfs/python/python-unit-2.pdf",
      3: "pdfs/python/python-unit-3.pdf",
      4: "pdfs/python/python-unit-4.pdf"
    },

    "C++": {
      1: "pdfs/cpp/cpp-unit-1.pdf",
      2: "pdfs/cpp/cpp-unit-2.pdf",
      3: "pdfs/cpp/cpp-unit-3.pdf",
      4: "pdfs/cpp/cpp-unit-4.pdf"
    },
    "Software Engineering": {
      1: "pdfs/Software-engineering/SE-unit-1.pdf",
      2: "pdfs/Software-engineering/SE-unit-2.pdf",
      3: "pdfs/Software-engineering/SE-unit-3.pdf",
      4: "pdfs/Software-engineering/SE-unit-4.pdf"
    },
    "Operating System": {
      1: "pdfs/Operating-system/OS-unit-1.pdf",
      2: "pdfs/Operating-system/OS-unit-2.pdf",
      3: "pdfs/Operating-system/OS-unit-3.pdf",
      4: "pdfs/Operating-system/OS-unit-4.pdf"
    },
    "Software Testing": {
      1: "pdfs/Software-testing/ST-unit-1.pdf",
      2: "pdfs/Software-testing/ST-unit-2.pdf",
      3: "pdfs/Software-testing/ST-unit-3.pdf",
      4: "pdfs/Software-testing/ST-unit-4.pdf"
    },
    "J2EE": {
      1: "pdfs/J2EE/j2ee-unit-1.pdf",
      2: "pdfs/J2EE/J2ee-unit-2.pdf",
      3: "pdfs/J2EE/J2ee-unit-3.pdf",
      4: "pdfs/J2EE/J2ee-unit-4.pdf"
    },
    "RDBMS": {
      1: "pdfs/RDBMS/RDBMS-unit-1.pdf",
      2: "pdfs/RDBMS/RDBMS-unit-2.pdf",
      3: "pdfs/RDBMS/RDBMS-unit-3.pdf",
      4: "pdfs/RDBMS/RDBMS-unit-4.pdf"
    },
    "Web Technology": {
      1: "pdfs/Web-technology/WT-unit-1.pdf",
      2: "pdfs/Web-technology/WT-unit-2.pdf",
      3: "pdfs/Web-technology/WT-unit-3.pdf",
      4: "pdfs/Web-technology/WT-unit-4.pdf"
    },
    "C Programming": {
      1: "pdfs/C-programming/C-unit-1.pdf",
      2: "pdfs/C-programming/C-unit-2.pdf",
      3: "pdfs/C-programming/C-unit-3.pdf",
      4: "pdfs/C-programming/C-unit-4.pdf"
    }

  };

  if(unit === null){
    return;
  }

  unit = unit.trim();

  if(notes[subject] && notes[subject][unit]){

    window.open(
      notes[subject][unit],
      "_blank"
    );

  } else {

    alert(
      "Notes not available for this unit!"
    );

  }

}

function scrollToSemester(){

  document.getElementById("semester")
  .scrollIntoView({
    behavior:"smooth"
  });

}

function openPaper(subject) {

    const papers = {
        c: "pyq/c_paper.pdf",
        cn: "pyq/cn_paper.pdf",
        wt: "pyq/webtech_paper.pdf",

        cpp: "pyq/cpp_paper.pdf",
        dsa: "pyq/dsa_paper.pdf",
        rdbms: "pyq/rdbms_paper.pdf",

        python: "pyq/python_paper.pdf",
        java: "pyq/java_paper.pdf",
        se: "pyq/software_engineering_paper.pdf",

        os: "pyq/os_paper.pdf",
        st: "pyq/software_testing_paper.pdf",
        j2ee: "pyq/j2ee_paper.pdf"
    };

    if (papers[subject]) {
        window.open(papers[subject], "_blank");
    } else {
        alert("Question paper not available");
    }
}