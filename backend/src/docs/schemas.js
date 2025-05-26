export const schemas = {
    TaskInput: {
        type: 'object',
        required: ['description', 'value', 'type'],
        properties: {
            description: {
                type: 'string',
                example: 'Salário mensal',
                minLength: 3
            },
            value: {
                type: 'number',
                example: 3500.50,
                minimum: 0.01
            },
            type: {
                type: 'string',
                enum: ['entrada', 'saída'],
                example: 'entrada'
            }
        }
    },
    TaskResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            data: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: '65a1c8f3d4e8b61234f56ab1' },
                    description: { type: 'string', example: 'Salário mensal' },
                    value: { type: 'number', example: 3500.50 },
                    type: { type: 'string', example: 'entrada' },
                    createdAt: { type: 'string', format: 'date-time' }
                }
            }
        }
    },
    ValidationError: {
        type: 'object',
        properties: {
            errors: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        msg: { type: 'string', example: 'Descrição é obrigatória' },
                        param: { type: 'string', example: 'description' }
                    }
                }
            }
        }
    }
};