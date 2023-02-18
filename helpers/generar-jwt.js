const jwt = require('jsonwebtoken');

// jwt trabaja con callbacks y en base a promesas
const generarJWT = ( uid = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRET_OR_PRIVATE_KEY, {
            expiresIn: '1h'
        }, ( err, token) => {

            if ( err ) {
                console.log(err);
                reject('No se pudo generar el Token');
            } else {
                resolve( token );
            }
            
        } );

    } );

}

module.exports = {
    generarJWT
}