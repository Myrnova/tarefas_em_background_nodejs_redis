import Mail from '../lib/Mail';

export default{
    key : 'RegistrationMail',
    options: {
        delay: 5000,
        priority: 3
        
    },
    async handle({ data }){ // para evitar escrever data.data usa a desestruturação com o {}
        const { user } = data;

        await Mail.sendMail({
            from: 'Debora <debora_cavallari@hotmail.com>',
            to: `${user.name} <${user.email}>`,
            subject: 'Cadastro de usuário',
            html: `Olá, ${user.name}, bem-vindo ao Node.`
        

    })
}
}
