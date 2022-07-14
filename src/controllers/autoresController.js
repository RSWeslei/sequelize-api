import Autor from "../models/Autor";

const getAll = async (req, res) => {
    try {
        const autores = await Autor.findAll();
        return res.status(200).send(autores);
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

const getById = async (req, res) => {
    try {
        let { id } = req.params;

        //garante que o id só vai ter NUMEROS;
        id = id.replace(/\D/g, '');
        if (!id) {
            return res.status(400).send({
                message: 'Informe um id válido para consulta'
            });
        }

        let autor = await Autor.findOne({
            where: {
                id
            }
        });

        if (!autor) {
            return res.status(400).send({
                message: `Não foi encontrada autor com o id ${id}`
            });
        }
        return res.status(200).send(autor);
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

const persistir = async (req, res) => {
    try {
        let { id } = req.params;
        //caso nao tenha id, cria um novo registro
        if (!id) {
            return await create(req.body, res)
        }

        return await update(id, req.body, res)
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

const create = async (dados, res) =>
{
    const {nome, email} = dados
    let autorExistente = await Autor.findOne({
        where: {
            email: email
        }
    });
    if (autorExistente) {
        return res.status(400).send({
            message: 'Já existe uma autor cadastrada com esse email'
        })
    }

    let autor = await Autor.create({
        nome: nome, 
        email: email
    });
    return res.status(201).send(autor)
}

const update = async (id, dados, res) => {
    let autor = await Autor.findOne({
        where: {
            id
        }
    });
    
    if (!autor) {
        return res.status(400).send({ type: 'error', message: `Não foi encontrado autor com o id ${id}` })
    }
    
    Object.keys(dados).forEach(field => {autor[field] = dados[field]})

    await autor.save();
    return res.status(200).send({
        message: `Autor ${id} atualizado com sucesso`,
        data: autor
    });
}

const deletar = async (req, res) => {
    try {
        let { id } = req.body;
        //garante que o id só vai ter NUMEROS;
        id = id ? id.toString().replace(/\D/g, '') : null;
        if (!id) {
            return res.status(400).send({
                message: 'Informe um id válido para deletar o autor'
            });
        }

        let autor = await Autor.findOne({
            where: {
                id
            }
        });

        if (!autor) {
            return res.status(400).send({ message: `Não foi encontrado autor com o id ${id}` })
        }

        await autor.destroy();
        return res.status(200).send({
            message: `Autor id ${id} deletado com sucesso`
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

export default {
    getAll,
    getById,
    persistir,
    deletar
};