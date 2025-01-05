//     This code was generated by a Reinforced.Typings tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

///<reference path="../Guid.d.ts"/>
///<reference path="../Either.d.ts"/>
///<reference path="../Maybe.ts"/>
///<reference path="ICreateChannelRequest.d.ts"/>
///<reference path="IRealtimeChannel.d.ts"/>
///<reference path="IRealtimeServerMember.d.ts"/>
///<reference path="InviteCodeEntity.d.ts"/>
///<reference path="InviteCode.d.ts"/>
///<reference path="IUser.d.ts"/>

interface IServerInteraction
{
	CreateChannel(request: ICreateChannelRequest) : Promise<void>;
	DeleteChannel(serverId: Guid, channelId: Guid) : Promise<void>;
	GetChannels(serverId: Guid) : Promise<IRealtimeChannel[]>;
	GetMembers(serverId: Guid) : Promise<IRealtimeServerMember[]>;
	JoinToVoiceChannel(serverId: Guid, channelId: Guid) : Promise<string>;
	DisconnectFromVoiceChannel(serverId: Guid, channelId: Guid) : Promise<void>;
	GetInviteCodes(serverId: Guid) : Promise<InviteCodeEntity[]>;
	CreateInviteCode(serverId: Guid, expiration: any) : Promise<InviteCode>;
	PrefetchUser(serverId: Guid, userId: Guid) : Promise<IUser>;
}
