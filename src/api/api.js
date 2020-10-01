const delay = function () {
    const randomDelay = Math.random() * 3 * 1000;
    return new Promise(resolve => setTimeout(resolve, randomDelay))
};

const authRequest = async function ({login, password}) {
    console.warn('Авторизация пользователя', {login, password});
    await delay();
    return new Promise(resolve => {
        return resolve({
            token: 'secret',
            info: {
                name: login || 'Имя пользователя'
            }
        })
    })
};

const contacts = [
    {fullName: 'Александрова Татьяна', phone: '+79270000001'},
    {fullName: 'Белозерцев Александр', phone: '+79270000002'},
    {fullName: 'Богородицкая Елена', phone: '+79270000003'},
    {fullName: 'Великанова Елена', phone: '+79270000004'},
    {fullName: 'Власова Алла', phone: '+79270000005'},
    {fullName: 'Гребенников Павел', phone: '+79270000006'},
    {fullName: 'Захаров Максим', phone: '+79270000007'},
    {fullName: 'Калинкин Андрей', phone: '+79270000008'},
    {fullName: 'Кузнецов Николай', phone: '+79270000009'},
    {fullName: 'Куприенко Нина', phone: '+79270000010'},
    {fullName: 'Лаврова Людмила', phone: '+79270000011'},
    {fullName: 'Минаева Маргарита', phone: '+79270000012'},
    {fullName: 'Менкин Антон', phone: '+79270000013'},
    {fullName: 'Николаенко Татьяна', phone: '+79270000014'},
    {fullName: 'Нишнев Владимир', phone: '+79170000015'},
    {fullName: 'Палагина Людмила', phone: '+79170000016'},
    {fullName: 'Пчелинцев Андрей', phone: '+79170000017'},
    {fullName: 'Романова Людмила', phone: '+79170000018'},
    {fullName: 'Русанова Татьяна', phone: '+79170000019'},
];

const contactsRequest = async function (filters) {
    await delay();

    let {name = '', phone = ''} = filters;
    name = name.toLowerCase().trim();
    phone = phone.toLowerCase().trim();

    const searcher = function (item) {
        if (phone && item.phone) {
            return item.phone.toLowerCase().indexOf(phone) !== -1
        }
        if (name && item.fullName) {
            return item.fullName.toLowerCase().indexOf(name) !== -1
        }
        return true
    };

    return new Promise(resolve => {
        return resolve({
            list: contacts.filter(searcher)
        })
    })
};

export {
    authRequest,
    contactsRequest
}