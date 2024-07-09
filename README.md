# Guida all'installazione e alla modifica

## 1. Scaricare il codice
![image](https://github.com/STG-Bots/super-staff-list-bot/assets/74712999/4fc391ea-02bd-4e24-adeb-6cfd463c987a)
## 2. Installazione dipendenze
#### 2.1 Scrivere il comando ```npm i``` per installare tutte le dipendenze (nel caso che non si abbia NodeJS installarlo)
## 3. File di configurazione
#### 3.1 Modificare oppure copiare il file **example.config.json** in un file chiamato **config.json**
![image](https://github.com/STG-Bots/super-staff-list-bot/assets/74712999/6d9c1832-d281-49ee-8ff5-8123b06e5cc9)
#### 3.2 Creare o utilizzare un bot (app)
![image](https://github.com/STG-Bots/super-staff-list-bot/assets/74712999/dbbbbe91-ea9e-4d90-8c96-8935577e319c)
#### 3.2.1 Preparare il bot
#### Andare nella tab **Installazione**
![image](https://github.com/STG-Bots/super-staff-list-bot/assets/74712999/e721aca9-ac8b-442a-8e6a-776652cec290)
#### Abilitare la spunta su ```Guild Install``` su ```Metodi d'installazione```
![image](https://github.com/STG-Bots/super-staff-list-bot/assets/74712999/4f87f9fd-b532-4ddf-8c5c-4f5a0aa8360d)
#### Poi nelle ```impostazioni predefinite d'autorizzazione``` selezionare come scopes ```applications.commands``` e ```bot``` e come permessi ```Administrator```
![image](https://github.com/STG-Bots/super-staff-list-bot/assets/74712999/eada823c-03ce-496f-af51-783556fec0fb)
#### Successivamente dirigetevi nella tab ```Bot``` e attivate gli ```intents``` e __disibilitare__ l'opzione del ```bot pubblico```
![image](https://github.com/STG-Bots/super-staff-list-bot/assets/74712999/c1c6ee34-d58e-4047-9010-682f9a06eef1) ![image](https://github.com/STG-Bots/super-staff-list-bot/assets/74712999/e792510e-f094-41d8-bf92-35fd58fdd6c9)
#### 3.2.2 Raccogliere le info del bot
#### Nel file di configurazione ci sono due opzioni che sono legate direttamente al bot il ```token``` e il ```clientID``` rispettivamente si trovano uno nella tab ```Bot``` e l'altro nella tab ```Informazioni Generali```
![image](https://github.com/STG-Bots/super-staff-list-bot/assets/74712999/c5011594-5442-48ec-8cc7-e549325599c1)
![image](https://github.com/STG-Bots/super-staff-list-bot/assets/74712999/310b4dc1-4fd6-460e-8054-4b35ed901d2d)
#### 4 Gli altri parametri
#### Gli altri due parametri sono la stringa che permette di connettersi ad un database in questo caso MongoDB e la lista dei developers che serve per bypassare volutamente alcuni controlli, ma in questo caso è possibile lasciare anche vuoto questo campo.
#### La stringa che permette la connessione al database (di test) vi è stata fornita all'inizio dove avete un ambiente di test dove provare le varie funzionalità
#### 5 Come carico / aggiorno il codice che ho modificato?
#### Allora se avete seguito questa guida il consiglio è di modificare il pezzo di codice che ci interessa in locale e poi creare il file o la cartella se già non esiste ed incollare il codice modificato con qualche commento sulla modifica che è stata effettuata
