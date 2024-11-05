import express from 'express';

const app = express();
app.use(express.urlencoded({extended: true}));
const porta = 3000; 
const host = 'localhost'; //ip refere-se a todas as interfaces locais(placas de rede do seu pc)



var listaplayer = []; // lista para armazenar Jogadores cadastrados
//implementar a funcionalidade para entregar um formulario html para o cliente
function cadastroPlayerView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Jogadores</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>

                <div>
                    <h1>Cadastro de Jogador</h1>
                    <form method="POST" action="/cadastrarplayer" class="row g-3" novalidate>
                        <div class="col-md-4">
                            <label for="nome" class="form-label">*Nome (será usado no personagem)</label>
                            <input type="text" class="form-control" id="nome" name="nome" required>
                        </div>

                        <div class="col-md-4">
                            <label for="senha" class="form-label">*senha</label>
                            <input type="password" class="form-control" id="senha" name="senha" required>
                        </div>

                        <div class="col-md-4">
                            <label for="validationCustomUsername" class="form-label">*Email</label>
                                <div class="input-group has-validation">
                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" class="form-control" id="Email" name="email" required>
                                </div>
                        </div>


                        <div class="col-md-6">
                            <label for="classe" class="form-label">*Escolha sua Classe</label>
                            <select class="form-select" id="listaclasses" name="listaclasses" required>
                                <option selected value="Escolha...">Escolha...</option>
                                <option value="Bárbaro">Bárbaro</option>
                                <option value="Bardo">Bardo</option>
                                <option value="Bruxo">Bruxo</option>
                                <option value="Clérigo">Clérigo</option>
                                <option value="Druida">Druida</option>
                                <option value="Feiticeiro">Feiticeiro</option>
                                <option value="Guardião">Guardião</option>
                                <option value="Guerreiro">Guerreiro</option>
                                <option value="Ladino">Ladino</option>
                                <option value="Mago">Mago</option>
                                <option value="Monge">Monge</option>
                                <option value="Paladino">Paladino</option>
                            </select>
                        </div>


                        <div class="col-md-3">
                            <label for="estadoMoral" class="form-label">*Estado Moral: </label>
                            <select class="form-select" id="moral" name="moral" required>
                            <option selected value="Escolha...">Escolha...</option>
                            <option value="LealeBondoso">Leal e Bondoso</option>
                            <option value="NeutroeBondoso">Neutro e Bondoso</option>
                            <option value="CaóticoeBondoso">Caótico e Bondoso</option>
                            <option value="LealeNeutro">Leal e Neutro</option>
                            <option value="Neutro">Neutro</option>
                            <option value="CaóticoeNeutro">Caótico e Neutro</option>
                            <option value="LealeMaligno">Leal e Maligno</option>
                            <option value="NeutroeMaligno">Neutro e Maligno</option>
                            <option value="CaóticoeMaligno">Caótico e Maligno</option>
                            </select>
                        </div>

                    <div class="col-md-3">
                        <label for="numero" class="form-label">Numero do Celular:</label>
                        <input type="text" class="form-control" id="numero" name="numero">
                        </div>
                    </div>

                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                    </form>
                    </div>
            </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
}

function menuView(req,resp) {
    resp.send(`
<html><head>
<title>Cadastro de Jogadores</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <meta charset="utf-8">
    </head>
    <body>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/cadastrarplayer">MENU</a>
            <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/cadastrarplayer">Cadastrar Jogador</a>
            </div>
            </div>
        </div>
        </nav>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</html>`);
}

function cadastrarplayer(req, resp) {
    //recupera dados do formulário
    const nome = req.body.nome;
    const senha = req.body.senha;
    const email = req.body.email;
    const classe = req.body.classe;
    const moral = req.body.moral;
    const numero = req.body.numero;

    const player = {nome,senha,email,classe,moral,numero};
    //adiciona jogadores a cada envio
    listaplayer.push(player);
    //Mostrar a Lista de jogadores já cadastrados
    resp.write(`
        <html>
            <head>
                <title> Jogadores Cadastrados </title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">           
             </head>
            <body>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">nome</th>
                        <th scope="col">senha</th>
                        <th scope="col">email</th>
                        <th scope="col">classe</th>
                        <th scope="col">moral</th>
                        <th scope="col">telefone</th>
                    </th>
                </thead>
                <tbody>
                `);

                for (let i = 0; i <listaplayer.length; i++) {
                    resp.write(`
                        <tr>
                            <td>${listaplayer[i].nome}</td>                        
                            <td>${listaplayer[i].senha}</td> 
                            <td>${listaplayer[i].email}</td> 
                            <td>${listaplayer[i].classe}</td>
                            <td>${listaplayer[i].moral}</td> 
                            <td>${listaplayer[i].telefone}</td>
                        </tr>
                        `);
                    
                }

    resp.write(`</tbody>
            </table>
            <a type="button" href="/cadastrarplayer">Continuar Cadastrando</a>
            </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
        `);
    resp.end();//envia a resposta
}

app.get('/',menuView);
app.get('/cadastrarplayer', cadastroPlayerView);//envia o formulario para cadastrar o personagem
app.post('/cadastrarplayer', cadastrarplayer);


app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
})