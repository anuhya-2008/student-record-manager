#include <iostream>
#include "StudentManager.h"

using namespace std;

int main()
{
    StudentManager manager;

    manager.loadFile();

    cout << "=========================================\n";
    cout << " Student Record Manager Backend Started\n";
    cout << "=========================================\n\n";

    cout << "Students Loaded: " << manager.getStudents().size() << endl;
    cout << "Frontend: Open frontend/index.html in Live Server.\n";

    return 0;
}