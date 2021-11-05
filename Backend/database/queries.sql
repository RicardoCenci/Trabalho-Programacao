SELECT recipient_id, sender_id, text,  UNIX_TIMESTAMP(created_at)  
FROM mensagem
WHERE recipient_id = 1
OR sender_id = 1
GROUP BY recipient_id, sender_id, text,  UNIX_TIMESTAMP(created_at)
ORDER BY id DESC
LIMIT 10