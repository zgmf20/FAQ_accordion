document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            toggleFAQ(question, answer);
        });

        question.addEventListener('keydown', (event) => {
            handleKeyboardNavigation(event, index, faqItems);
        });
    });

    function toggleFAQ(question, answer) {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        question.setAttribute('aria-expanded', !isExpanded);
        answer.hidden = isExpanded;
    
        const iconPlus = question.querySelector('.icon-plus');
        const iconMinus = question.querySelector('.icon-minus');
    
        if (!isExpanded) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            iconPlus.hidden = true;
            iconMinus.hidden = false;
        } else {
            answer.style.maxHeight = null;
            iconPlus.hidden = false;
            iconMinus.hidden = true;
        }
    }

    function handleKeyboardNavigation(event, index, faqItems) {
        const question = event.target;
        const answer = question.nextElementSibling;

        switch (event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                toggleFAQ(question, answer);
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (index > 0) {
                    faqItems[index - 1].querySelector('.faq-question').focus();
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (index < faqItems.length - 1) {
                    faqItems[index + 1].querySelector('.faq-question').focus();
                }
                break;
            case 'Home':
                event.preventDefault();
                faqItems[0].querySelector('.faq-question').focus();
                break;
            case 'End':
                event.preventDefault();
                faqItems[faqItems.length - 1].querySelector('.faq-question').focus();
                break;
        }
    }
});