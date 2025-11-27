document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    // Toggle menu mobile
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Fechar menu ao clicar em um item
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Adicionar classe ativa ao rolar a página
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar classe de animação aos elementos quando eles aparecem na tela
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.midia-card, .destaque-card, .depoimento-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Configuração inicial para elementos animados
    document.querySelectorAll('.midia-card, .destaque-card, .depoimento-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Disparar animação no carregamento e no scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Validação do formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Resetar mensagens de erro
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validar nome
            if (name.value.trim() === '') {
                showError(name, 'Por favor, insira seu nome');
                isValid = false;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError(email, 'Por favor, insira um email válido');
                isValid = false;
            }
            
            // Validar telefone (opcional, mas se preenchido, deve ter pelo menos 10 dígitos)
            if (phone.value.trim() !== '' && phone.value.replace(/\D/g, '').length < 10) {
                showError(phone, 'Por favor, insira um telefone válido');
                isValid = false;
            }
            
            // Validar mensagem
            if (message.value.trim() === '') {
                showError(message, 'Por favor, insira sua mensagem');
                isValid = false;
            }
            
            // Se o formulário for válido, pode enviar
            if (isValid) {
                // Aqui você pode adicionar o código para enviar o formulário
                // Por exemplo, usando Fetch API ou AJAX
                const formData = new FormData(contactForm);
                
                // Simulando envio (substitua pelo seu código real de envio)
                console.log('Formulário enviado:', Object.fromEntries(formData));
                
                // Mostrar mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                successMessage.style.color = '#28a745';
                successMessage.style.marginTop = '20px';
                successMessage.style.padding = '10px';
                successMessage.style.borderRadius = '5px';
                successMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Rolagem suave para a mensagem de sucesso
                setTimeout(() => {
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                
                // Remover a mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 5000);
            }
        });
        
        // Função para mostrar mensagem de erro
        function showError(input, message) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = message;
            error.style.color = '#dc3545';
            error.style.fontSize = '0.8rem';
            error.style.marginTop = '5px';
            input.parentNode.insertBefore(error, input.nextSibling);
            input.style.borderColor = '#dc3545';
            
            // Remover a mensagem de erro quando o usuário começar a digitar
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    error.remove();
                    this.style.borderColor = '';
                }
            }, { once: true });
        }
    }
    
    // Filtro para a página de pontos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const pontoItems = document.querySelectorAll('.ponto-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover classe ativa de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adicionar classe ativa ao botão clicado
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filtrar itens
                pontoItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Função para carregar o Mapa
function initMap() {
    // Coordenadas do centro do mapa (João Pessoa como referência)
    const center = { lat: -7.1194958, lng: -34.8450118 };
    
    // Opções do mapa
    const options = {
        zoom: 7,
        center: center,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ]
    };
    
    // Criar o mapa
    const map = new google.maps.Map(document.getElementById('map'), options);
    
    // Adicionar marcadores para as cidades
    const cities = [
        {
            name: 'João Pessoa',
            position: { lat: -7.1194958, lng: -34.8450118 },
            info: '300 pontos de mídia'
        },
        {
            name: 'Campina Grande',
            position: { lat: -7.230718, lng: -35.881666 },
            info: '200 pontos de mídia'
        },
        {
            name: 'Caruaru',
            position: { lat: -8.2849639, lng: -35.9701874 },
            info: '200 pontos de mídia'
        }
    ];
    
    // Adicionar marcadores ao mapa
    cities.forEach(city => {
        const marker = new google.maps.Marker({
            position: city.position,
            map: map,
            title: city.name
        });
        
        // Adicionar janela de informações ao clicar no marcador
        const infoWindow = new google.maps.InfoWindow({
            content: `<div><strong>${city.name}</strong><br>${city.info}</div>`
        });
        
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    });
}
