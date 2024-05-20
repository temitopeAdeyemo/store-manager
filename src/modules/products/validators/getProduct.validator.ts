import { celebrate, Joi, Segments } from 'celebrate';

export const getManyValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    product_name: Joi.string(),
    product_code: Joi.string()
      .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
      .message('product code can only be upper case letters, underscore and numbers'),
    amount: Joi.number().positive(),
    discount: Joi.string()
      .pattern(/^[0-9]+$/)
      .message('Discount values can only be number.'),
    category: Joi.string(),
    uploaded_by: Joi.string(),
    quantity: Joi.string(),
    images: Joi.string(),
    availability_status: Joi.string(),
  }),
});

export const getOneValidator = celebrate({
  [Segments.QUERY]: Joi.object()
    .keys({
      product_code: Joi.string()
        .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
        .message('Code can only be upper case letters, underscore and numbers'),
      product_id: Joi.string(),
    })
    .xor('product_code', 'product_id'),
});
