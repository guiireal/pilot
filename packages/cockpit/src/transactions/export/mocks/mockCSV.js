const mockCSV = `Status,ID,Data,Nome,Forma de Pagamento,Número do Cartão,Documento,Email,ID da Assinatura,Telefone,Operadora de Cartão,Resposta da Operadora,IP,Bandeira do Cartão,Valor,Valor Capturado,Valor Estornado,Recebedores,Endereço,Número do Endereço,Complemento,Bairro,CEP,Cidade,Estado,Nível de Risco,Antifraude
refunded,1565115,2017-05-25T19:13:22.859Z,Test,credit_card,411111,-,test@test.com,201341,,Test,acquirer,179.34.134.27,visa,2000,-,2000,,-,-,-,-,-,-,-,-,-
refused,1301999,2017-02-15T21:45:05.198Z,Test,credit_card,411111,-,test@test.com,,(51) 99873-3526,Test,capture_timeout,,visa,5490,-,5490,,-,-,-,-,-,-,-,-,-
refused,1301925,2017-02-15T21:05:05.126Z,Test,credit_card,411111,-,test@test.com,,(51) 99873-3526,Test,capture_timeout,,visa,5490,-,5490,,-,-,-,-,-,-,-,-,-
refused,1280667,2017-02-08T18:00:04.905Z,-,credit_card,491604,-,-,,,Test,capture_timeout,,visa,100000,-,100000,,-,-,-,-,-,-,-,-,-
refused,1280910,2017-02-08T13:07:47.540Z,-,credit_card,491604,-,-,,,Test,acquirer,,visa,100000,-,0,,-,-,-,-,-,-,-,-,-
paid,1732031,2017-07-19T19:42:54.215Z,Aardvark da Silva,credit_card,455636,-,aardvark.silva@gmail.com,,(11) 98765-4321,Aardvark da Silva,acquirer,10.2.13.21,visa,1000,-,0,,-,-,-,-,-,-,-,-,-
paid,1761390,2017-07-26T15:16:26.650Z,Test,credit_card,411111,-,test@test.com,,(42) 3624-3958,Test,acquirer,10.2.14.249,visa,1000,-,0,,-,-,-,-,-,-,-,-,-
paid,1761674,2017-07-26T15:56:54.544Z,Test,credit_card,411111,-,test@test.com,,(42) 3624-3958,Test,acquirer,10.2.13.21,visa,48521,-,0,,-,-,-,-,-,-,-,-,-
paid,1815318,2017-08-10T19:12:23.999Z,Test,credit_card,411111,-,test@test.com,221378,,Test,acquirer,10.2.14.195,visa,20000,-,0,,-,-,-,-,-,-,-,-,-
refunded,2956651,2018-02-22T20:54:52.109Z,-,credit_card,411111,-,-,,,Test,acquirer,201.48.106.225,visa,56435,-,56435,,-,-,-,-,-,-,-,-,-
paid,2956649,2018-02-22T20:53:37.228Z,-,credit_card,411111,-,-,,,Test,acquirer,201.48.106.225,visa,5646,-,0,,-,-,-,-,-,-,-,-,-
refused,2956657,2018-02-22T20:55:35.571Z,-,credit_card,411111,-,-,,,Test,acquirer,201.48.106.225,visa,34567,-,0,,-,-,-,-,-,-,-,-,-
refused,2956655,2018-02-22T20:55:07.771Z,-,credit_card,411111,-,-,,,Test,acquirer,201.48.106.225,visa,4567,-,0,,-,-,-,-,-,-,-,-,-
paid,2956647,2018-02-22T20:53:11.403Z,-,credit_card,411111,-,-,,,Test,acquirer,201.48.106.225,visa,45643,-,0,,-,-,-,-,-,-,-,-,-
refunded,2956654,2018-02-22T20:54:49.589Z,-,credit_card,411111,-,-,,,Test,acquirer,201.48.106.225,visa,34567,-,34567,,-,-,-,-,-,-,-,-,-`

export default mockCSV
