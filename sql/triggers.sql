DELIMITER //
CREATE OR REPLACE TRIGGER maximunPhotosPerUser
    BEFORE INSERT ON Photos FOR EACH ROW
    BEGIN
        DECLARE sol INT;
        SET sol = (SELECT COUNT(*) FROM Photos WHERE userId=new.userId);
        IF(sol =50) THEN
            SIGNAL SQLSTATE '45000' SET message_text =
            'You can only update 50 photos';
        END IF;
    END//
DELIMITER ;