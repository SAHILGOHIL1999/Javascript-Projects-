// for (let i = 1; i <= 10; i++) {
//     if (i == 3) {
//         continue; // Skips 3
//     }
//     if(i == 7) {
//         break; // Stops the loop at 7
//     }
//     console.log("Number: " + i);
// }

let students = ["Sahil", "Rahul", "Deep", "Aman"];
let searchName = "Deep";
let found = false;

for (let i = 0; i < students.length; i++) {
    if (students[i] === searchName) {
        console.log(searchName + " found at index " + i);
        found = true;
        break; // Stop looking once found
    }
}

if (!found) {
    console.log("Student not found.");
}