CREATE TABLE students ( 
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL, -- 50 bits
    last_name VARCHAR(50), -- 50 bits

    email VARCHAR(322) UNIQUE NOT NULL,
    phone_number VARCHAR(10) UNIQUE, -- 4000 bytes vs 10 bits
    country_code VARCHAR(4), -- 4 bits

    age INT CHECK (age > 12),
    current_status VARCHAR(20) DEFAULT 'active' CHECK (current_status IN ('active', 'graduated', 'dropped_out')),

    snorlax_id VARCHAR(50) UNIQUE, -- 50 bits
    has_one_to_one_relationship_with_snorlax BOOLEAN DEFAULT FALSE,
    current_score INT DEFAULT 0 CHECK (current_score >= 0 AND current_score <= 100),
    enrollment_date DATE DEFAULT CURRENT_DATE -- This is UTC ('2026-04-14')

);
ALTER TABLE students -- students table already exists, we are altering it to add a new column
ADD COLUMN batch_name VARCHAR(50) DEFAULT 'Batch A'; -- 50 bits

-- DDL ? data definition language
