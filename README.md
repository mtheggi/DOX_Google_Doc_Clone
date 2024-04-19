# DOX_Google_Doc_Clone

User  : 
_id ,email , userName , Password , || [list of objects ][ object { DocId  , premissions}] 


Document:

_Id,content,OwnerId (delete, rename, view ,edit)


fekra 1 
User_Premissions 
{_id},UserId , DocumentId , [Delete , rename ,view ,edit]->boolean 
 

## documentation API 
https://docs.google.com/document/d/13crG1VhGFKycchIWPu1T3OujaelBUYup1vUjEs1jipQ/edit?usp=sharing



## TO DOS 
- [x] 1- Create a Document Model , User_Permissons Model (Need to Reviewed)
- [x] 2- bos API documentation implmentation 
- [x] 3- Atherization {token , jwt, password hashing } (Reviewed needed)
- [x] 4- front end with malek 
----------------------------------- 
- [] 5- add creatAt attribut in the document model and make sure the document list is returned in the order of the recent creation   
- [] 6- revise the Scenario of CRDT  in the API documentation
- [] 7- make the the socket is working first , I did the backend part , tried to test the socket with 
postman but it didn't work , I will try to test it with the front end
- [] 8- CRDT Logic at the front 
