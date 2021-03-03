///got the structure from another student and made it my own inserting from top down starting with department and then into role and then into employee. 

use employees;
INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Research and Development'),
    ('Manufacturing'),
    ('Distribution');
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Field Manager', 11000000, 1),
    ('Sales Rep', 7000000, 1),
    ('Project Manager', 15000000, 2),
    ('Engineer', 8000000, 2),
    ('Foreman', 7000000, 3),
    ('Maintenance', 3000000, 3),
    ('Shipping Specialist', 12000000, 4),
    ('Warehouse Staff', 2500000, 4);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Stienbeck', 1, NULL),
    ('Lowell', 'Swift', 2, 1),
    ('Amy', 'Churchill', 3, NULL),
    ('Sarah', 'DeMurcurio', 4, 3),
    ('Mady', 'Taylor', 5, NULL),
    ('Julia', 'Green', 6, 5),
    ('Vickee', 'Shulman', 7, NULL),
    ('Oprah', 'Winfrey', 8, 7);
    
