from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import Member
from api.serializers import (
    MemberRegistrationSerializer,
    MemberLoginSerializer,
    MemberProfileSerializer,
    MemberUpdateSerializer
)


def get_tokens_for_member(member):
    refresh = RefreshToken()
    refresh['member_id'] = member.id
    refresh['email'] = member.email
    
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = MemberRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        member = serializer.save()
        tokens = get_tokens_for_member(member)
        return Response({
            'member': MemberProfileSerializer(member).data,
            'tokens': tokens
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    serializer = MemberLoginSerializer(data=request.data)
    if serializer.is_valid():
        member = serializer.validated_data['member']
        tokens = get_tokens_for_member(member)
        return Response({
            'member': MemberProfileSerializer(member).data,
            'tokens': tokens
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    try:
        member_id = request.auth.payload.get('member_id')
        member = Member.objects.get(id=member_id)
        serializer = MemberProfileSerializer(member)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Member.DoesNotExist:
        return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_profile_view(request):
    try:
        member_id = request.auth.payload.get('member_id')
        member = Member.objects.get(id=member_id)
        serializer = MemberUpdateSerializer(member, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(MemberProfileSerializer(member).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Member.DoesNotExist:
        return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)
