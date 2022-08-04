import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';

const User = getData.sequelizeClient.define('cat_users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese un nombre'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            arg: true,
            msg: ''
        },
        validate: {
            notNull: {
                msg: 'Ingrese un correo'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese una contraseña'
            }
        }
    },

}, {
    tableName: 'cat_users',
    freezeTableName: true,
    hooks: {
        beforeCreate: async (user, options) => {
            {
                const salt = await bcryptjs.genSaltSync(10);
                user.password = user.password && user.password != "" ? bcryptjs.hashSync(user.password, salt) : "";
            }
        }
    }

});

const UserRecovery = getData.sequelizeClient.define('cat_user_recovery', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            arg: true,
            msg: ''
        },
        validate: {
            notNull: {
                msg: 'Ingrese un correo'
            }
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
    },

}, {
    tableName: 'cat_user_recovery',
    freezeTableName: true
});



export const getUser = { User, UserRecovery };
