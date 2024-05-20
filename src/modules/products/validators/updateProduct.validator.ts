import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      product_name: Joi.string()
        .pattern(/^[\w-]+$/)
        .message('Product name can only be numbers, letters, hyphens and underscores.'),
      product_code: Joi.string()
        .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
        .message('Product Code can only be upper case letters, underscore and numbers'),
      amount: Joi.number().positive(),
      discount: Joi.string()
        .pattern(/^[0-9]+$/)
        .message('Discount values can only be number.'),
      category: Joi.string(),
      quantity: Joi.string(),
      images: Joi.string(),
      availability_status: Joi.string(),
    })
    .xor('product_name', 'product_code', 'amount', 'discount', 'category'),
  [Segments.PARAMS]: Joi.object().keys({
    product_id: Joi.string().required(),
  }),
});
