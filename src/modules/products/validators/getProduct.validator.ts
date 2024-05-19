import { celebrate, Joi, Segments } from 'celebrate';

export const getManyValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    product_name: Joi.string().required(),
    product_code: Joi.string()
      .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
      .message('product code can only be upper case letters, underscore and numbers')
      .required(),
    amount: Joi.number().positive().required(),
    discount: Joi.string()
      .pattern(/^[0-9]+$/)
      .message('Discount values can only be number.')
      .required(),
    category: Joi.string()
      .pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      .message('Invalid category')
      .required(),
  }),
});

export const getOneValidator = celebrate({
  [Segments.QUERY]: Joi.object()
    .keys({
      product_code: Joi.string()
        .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
        .message('Code can only be upper case letters, underscore and numbers')
        .required(),
      product_id: Joi.string()
        .pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
        .required(),
    })
    .xor('product_code', 'product_id'),
  // .message('product code or id is required.'),
});
