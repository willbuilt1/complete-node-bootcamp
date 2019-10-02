module.exports = (template, product) =>{
    //Template provided is a string so has replace method
    //REGEX used so that it replaces every instance of requested string
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%NUTRI%}/g, product.nutrients);
    output = output.replace(/{%ORIGIN%}/g, product.from);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%SLUG%}/g, product.slug);
    //if boolean is fase then it replaces placeholder with class 'not-organic'
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}