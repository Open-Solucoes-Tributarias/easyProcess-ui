Rodar projeto

rodar projeto EasyProcess
 
Tem que seguir esses passos:
 
 
01. Abrir o docker na maquina
 
02. Rodar  docker-compose up -d
 
00. dotnet ef migrations add atualizacao --startup-project EasyProcess --project EasyProcess.Infrastructure
 
01. dotnet ef database update --startup-project EasyProcess
 
04. Rodar a API dotnet run --project EasyProcess
