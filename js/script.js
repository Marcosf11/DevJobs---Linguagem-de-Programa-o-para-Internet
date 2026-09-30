const vagas = [
    {
        id: 1,
        titulo: 'Desenvolvedor(a) Frontend React',
        empresa: 'TechNova Ltda',
        tipo: 'remoto',
        tecnologias: ['React', 'TypeScript', 'CSS'],
        salario: 'R$ 6.000 – R$ 9.000',
        local: 'Remoto'
    },
    {
        id: 2,
        titulo: 'Backend Node.js',
        empresa: 'DataFlow',
        tipo: 'hibrido',
        tecnologias: ['Node.js', 'PostgreSQL'],
        salario: 'R$ 7.000 – R$ 10.000',
        local: 'São Paulo, SP'
    },
    {
        id: 3,
        titulo: 'Analista de Suporte de TI',
        empresa: 'Support++',
        tipo: 'presencial',
        tecnologias: ['Windows', 'Redes', 'Hardware'],
        salario: 'R$ 2.800 – R$ 3.000',
        local: 'São Paulo, MG'
    },
    {
        id: 4,
        titulo: 'Desenvolvedor Java',
        empresa: 'CodeSolutions',
        tipo: 'hibrido',
        tecnologias: ['Java', 'Spring Boot', 'MySQL'],
        salario: 'R$ 5.500 – R$ 8.000',
        local: 'Belo Horizonte, MG'
    },
    {
        id: 5,
        titulo: 'Desenvolvedor Mobile Android',
        empresa: 'AppTech',
        tipo: 'remoto',
        tecnologias: ['Android', 'Kotlin', 'Firebase'],
        salario: 'R$ 5.000 – R$ 7.500',
        local: 'Remoto'
    },
    {
        id: 6,
        titulo: 'Analista de Infraestrutura',
        empresa: 'NetSystems',
        tipo: 'presencial',
        tecnologias: ['Linux', 'Redes', 'Servidores'],
        salario: 'R$ 4.000 – R$ 6.000',
        local: 'Campinas, SP'
    }
];

function criarCard(vaga) {
    const article = document.createElement('article');
    article.className = 'job-card';
    article.dataset.id = vaga.id;

    const badgeClass = {
        remoto: 'job-card__badge--remote',
        presencial: 'job-card__badge--onsite',
        hibrido: 'job-card__badge--hybrid'
    }[vaga.tipo] || '';

    const tipoLabel = {
        remoto: 'Remoto',
        presencial: 'Presencial',
        hibrido: 'Híbrido'
    }[vaga.tipo] || vaga.tipo;

    const header = document.createElement('div');
    header.className = 'job-card__header';

    const badge = document.createElement('span');
    badge.className = `job-card__badge ${badgeClass}`;
    badge.textContent = tipoLabel;

    const title = document.createElement('h3');
    title.className = 'job-card__title';
    title.textContent = vaga.titulo;

    const company = document.createElement('p');
    company.className = 'job-card__company';
    company.textContent = vaga.empresa;

    header.append(badge, title, company);

    const body = document.createElement('div');
    body.className = 'job-card__body';

    const tech = document.createElement('p');
    tech.className = 'job-card__tech';
    tech.textContent = vaga.tecnologias.join(' · ');

    const salary = document.createElement('p');
    salary.className = 'job-card__salary';
    salary.textContent = vaga.salario;

    const location = document.createElement('p');
    location.className = 'job-card__location';
    location.textContent = `📍 ${vaga.local}`;

    body.append(tech, salary, location);

    const footer = document.createElement('div');
    footer.className = 'job-card__footer';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn--primary';
    btn.textContent = 'Ver detalhes';

    footer.appendChild(btn);
    article.append(header, body, footer);

    return article;
}

function renderizarVagas(lista) {
    const grid = document.getElementById('jobs-grid');
    grid.replaceChildren();

    if (lista.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'empty-msg';
        emptyMsg.textContent = 'Nenhuma vaga encontrada.';
        grid.appendChild(emptyMsg);
        return;
    }

    const fragment = document.createDocumentFragment();
    lista.forEach(vaga => fragment.appendChild(criarCard(vaga)));
    grid.appendChild(fragment);
}

// Chamada para renderizar na tela
renderizarVagas(vagas);

const inputBusca = document.getElementById('busca');

function filtrarVagas(termo) {
    const busca = termo.trim().toLowerCase();

    if (!busca) {
        return vagas;
    }

    return vagas.filter(vaga => {
        const texto = [
            vaga.titulo,
            vaga.empresa,
            vaga.local,
            ...vaga.tecnologias
        ].join(' ').toLowerCase();

        return texto.includes(busca);
    });
}

function atualizarContagem(qtd, termo) {
    const el = document.getElementById('resultado-contagem');

    if (!termo.trim()) {
        el.textContent = `${qtd} vagas disponíveis`;
    } else {
        el.textContent = `${qtd} vaga(s) encontrada(s) para "${termo}"`;
    }
}

inputBusca.addEventListener('input', (evento) => {
    const termo = evento.target.value;
    const resultado = filtrarVagas(termo);

    renderizarVagas(resultado);
    atualizarContagem(resultado.length, termo);
});

atualizarContagem(vagas.length, '');

const THEME_KEY = 'devjobs-theme';
const btnTheme = document.getElementById('theme-toggle');

function aplicarTema(tema) {
    document.body.classList.toggle('dark', tema === 'dark');

    btnTheme.textContent = tema === 'dark' ? '☀️' : '🌙';

    btnTheme.setAttribute(
        'aria-label',
        tema === 'dark'
            ? 'Ativar tema claro'
            : 'Ativar tema escuro'
    );
}

function carregarTemaSalvo() {
    const salvo = localStorage.getItem(THEME_KEY);

    if (salvo) {
        aplicarTema(salvo);
        return;
    }

    const prefereDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;

    aplicarTema(prefereDark ? 'dark' : 'light');
}

function alternarTema() {
    const isDark = document.body.classList.contains('dark');
    const novoTema = isDark ? 'light' : 'dark';

    aplicarTema(novoTema);
    localStorage.setItem(THEME_KEY, novoTema);
}

btnTheme.addEventListener('click', alternarTema);

carregarTemaSalvo();