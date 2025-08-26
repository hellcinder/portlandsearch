class PortlandRevenueChatbot {
    constructor() {
        this.revenueData = {
            businessTax: {
                name: "Business License (Income) Tax",
                code: "PCC 7.02",
                description: "Tax on business income earned within Portland city limits",
                links: ["Portland.gov", "Efiles"],
                details: "Portland Business Tax rate is 2.6%. Must register within 60 days of starting business. Generally due April 15. Exemptions for businesses under $50,000 gross income. Penalties up to $500 for late filing."
            },
            artsTax: {
                name: "Arts Education & Access Tax",
                code: "PCC 5.73",
                description: "$35 per income-earning adult resident (with poverty exemption)",
                links: ["Portland.gov", "Efiles"],
                details: "Annual $35 tax for Portland residents 18+ with income over $1,000 and household income above federal poverty level. Due same date as federal tax return (April 15). $15 penalty if late, additional $20 if unpaid after 6 months. Supports K-5 arts education."
            },
            cleanEnergy: {
                name: "Clean Energy Surcharge (CES)",
                code: "PCC 7.02/7.07",
                description: "Surcharge enacted by ballot measure to fund clean energy initiatives",
                links: ["Portland.gov"],
                details: "Implemented through ballot measure with administration pages available online."
            },
            hotelTax: {
                name: "Transient Lodgings (Hotel/Short-stay) Tax",
                code: "PCC 6.04",
                description: "6% city tax on hotel and short-term rental stays",
                links: ["Portland.gov", "Efiles"],
                details: "6% city rate plus county and tourism assessments. Applies to hotels and short-term rentals."
            },
            budget: {
                name: "FY 2024-25 Budget",
                description: "Portland's adopted budget for fiscal year 2024-2025",
                details: "Property and business license taxes make up only 12% of budgeted revenue. General Fund represents about 10% of total budget."
            }
        };
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Basic tax obligation questions
        if (lowerMessage.includes('do i have to pay') && lowerMessage.includes('tax')) {
            return "Whether you need to pay Portland taxes depends on your situation:<br><br>" +
                   "• <strong>Arts Tax:</strong> If you're 18+ with income over poverty level and live in Portland<br>" +
                   "• <strong>Business Tax:</strong> If you operate a business earning income in Portland<br>" +
                   "• <strong>Hotel Tax:</strong> If you stay in hotels/short-term rentals in Portland<br>" +
                   "• <strong>Clean Energy Surcharge:</strong> Applied to certain utility bills<br><br>" +
                   "Ask about specific taxes for detailed requirements!";
        }
        
        // Arts tax specific questions
        if (lowerMessage.includes('what is') && lowerMessage.includes('arts tax')) {
            return "The <strong>Arts Education & Access Tax</strong> is a $35 annual tax for Portland residents who:<br><br>" +
                   "• Are 18 years or older<br>" +
                   "• Have annual income of $1,000 or more<br>" +
                   "• Have household income above federal poverty level<br>" +
                   "• Live in Portland<br><br>" +
                   "The tax funds K-5 arts and music education in schools and local nonprofit arts organizations. You must file even if you don't owe tax.";
        }
        
        if (lowerMessage.includes('do i have to pay') && lowerMessage.includes('arts tax')) {
            return "You must pay the Arts Tax if you meet ALL these criteria:<br><br>" +
                   "• Age 18 or older<br>" +
                   "• Live in Portland<br>" +
                   "• Annual income of $1,000 or more<br>" +
                   "• Household income above federal poverty level<br><br>" +
                   "<strong>You're EXEMPT if:</strong><br>" +
                   "• Under age 18<br>" +
                   "• Annual income less than $1,000<br>" +
                   "• Household income at/below federal poverty level<br><br>" +
                   "Contact: ArtsTaxHelp@portlandoregon.gov or 503-865-4278";
        }
        
        // Tax due dates and deadlines
        if (lowerMessage.includes('when') && (lowerMessage.includes('due') || lowerMessage.includes('deadline'))) {
            return "<strong>Portland Tax Due Dates:</strong><br><br>" +
                   "• <strong>Arts Tax:</strong> April 15th (same as federal) - $15 penalty if late, $20 more after 6 months<br>" +
                   "• <strong>Business Tax:</strong> April 15th for calendar year filers - $500 penalty for late filing<br>" +
                   "• <strong>Hotel Tax:</strong> Monthly by 15th of following month<br>" +
                   "• <strong>Clean Energy Surcharge:</strong> Included with utility bills<br><br>" +
                   "<strong>Help:</strong> Revenue Office 503-823-5157, M-F 9am-4:30pm, 111 SW Columbia St Suite 600";
        }
        
        if (lowerMessage.includes('business') && (lowerMessage.includes('tax') || lowerMessage.includes('license'))) {
            return this.formatResponse(this.revenueData.businessTax);
        }
        
        if (lowerMessage.includes('arts') && lowerMessage.includes('tax') && !lowerMessage.includes('what is') && !lowerMessage.includes('do i have to pay')) {
            return this.formatResponse(this.revenueData.artsTax);
        }
        
        if (lowerMessage.includes('clean energy') || lowerMessage.includes('ces')) {
            return this.formatResponse(this.revenueData.cleanEnergy);
        }
        
        if (lowerMessage.includes('hotel') || lowerMessage.includes('lodging') || lowerMessage.includes('transient')) {
            return this.formatResponse(this.revenueData.hotelTax);
        }
        
        if (lowerMessage.includes('budget') || lowerMessage.includes('revenue') || lowerMessage.includes('income')) {
            return this.formatResponse(this.revenueData.budget);
        }
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello! I'm here to help with Portland revenue information. You can ask about business taxes, arts tax, clean energy surcharge, hotel taxes, or general budget information.";
        }
        
        return "I can help you with information about Portland's revenue sources including Business License Tax, Arts Tax, Clean Energy Surcharge, Transient Lodgings Tax, and budget information. You can also ask basic questions like 'Do I have to pay taxes?' or 'When are taxes due?'";
    }
    
    formatResponse(data) {
        let response = `<strong>${data.name}</strong><br>`;
        
        if (data.code) {
            response += `<em>Code: ${data.code}</em><br><br>`;
        }
        
        response += `${data.description}<br><br>`;
        response += `${data.details}`;
        
        if (data.links && data.links.length > 0) {
            response += `<br><br><strong>Available at:</strong> ${data.links.join(', ')}`;
        }
        
        return response;
    }
}

const chatbot = new PortlandRevenueChatbot();
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = content;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    addMessage(message, true);
    
    const response = chatbot.processMessage(message);
    setTimeout(() => {
        addMessage(response);
    }, 500);
    
    userInput.value = '';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}