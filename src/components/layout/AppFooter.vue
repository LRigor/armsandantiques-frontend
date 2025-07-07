<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useVisitorStore } from '@/stores/visitors'
import IconPinterest from '@/components/icons/IconPinterest.vue'
import IconPaymentMasterCard from '@/components/icons/IconPaymentMasterCard.vue'
import IconPaymentPayPal from '@/components/icons/IconPaymentPayPal.vue'
import IconPaymentVisa from '@/components/icons/IconPaymentVisa.vue'
import IconShareFacebook from '@/components/icons/IconShareFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconVK from '@/components/icons/IconVK.vue'
import IconSnapchat from '@/components/icons/IconSnapchat.vue'
import IconPinterestAlt from '@/components/icons/IconPinterestAlt.vue'

useVisitorStore().fetchVisitorCount()
</script>

<template>
  <footer class="text-white">
    <div class="bg-black">
      <div class="max-w-7xl mx-auto px-4 py-16 grid grid-cols-5 justify-between text-xl">
        <div class="flex flex-col gap-4 col-span-2">
          <h2>Items for Sale</h2>
          <div class="grid grid-cols-2 gap-4">
            <ul class="text-gray-400 flex flex-col gap-2">
              <li><RouterLink to="/products">India</RouterLink></li>
              <li><RouterLink to="/categories">China, East Asia,</RouterLink></li>
              <li><RouterLink to="/brands">Tibet</RouterLink></li>
              <li><RouterLink to="/brands">Middle East,</RouterLink></li>
              <li><RouterLink to="/brands">Ottoman Turkey,</RouterLink></li>
              <li><RouterLink to="/brands">Persia</RouterLink></li>
              <li><RouterLink to="/brands">Europe</RouterLink></li>
              <li><RouterLink to="/brands">Islamic Antiques</RouterLink></li>
            </ul>
            <ul class="text-gray-400 flex flex-col gap-2">
              <li><RouterLink to="/about">Swords</RouterLink></li>
              <li><RouterLink to="/contact">Daggers</RouterLink></li>
              <li><RouterLink to="/terms">Antiques</RouterLink></li>
              <li><RouterLink to="/privacy">Armor</RouterLink></li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <h2>Archive</h2>
          <ul class="text-gray-400 flex flex-col gap-2">
            <li><RouterLink to="/contact">Sold Items</RouterLink></li>
            <li><RouterLink to="/contact">Museum of the World</RouterLink></li>
            <li><RouterLink to="/contact">Our library</RouterLink></li>
          </ul>
        </div>
        <div class="flex flex-col gap-4">
          <h2>Information</h2>
          <ul class="text-gray-400 flex flex-col gap-2">
            <li><RouterLink to="/contact">About Us</RouterLink></li>
            <li><RouterLink to="/contact">Free Shipping</RouterLink></li>
            <li><RouterLink to="/contact">Terms of Sale</RouterLink></li>
            <li><RouterLink to="/contact">100% Guarantee</RouterLink></li>
            <li><RouterLink to="/contact">Sell to Us</RouterLink></li>
            <li><RouterLink to="/contact">Privacy Policy</RouterLink></li>
          </ul>
        </div>
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <h2>Contact Us</h2>
            <h3 class="text-gray-400 text-lg mt-2">+1 (855) 927-3393</h3>
            <h3 class="text-gray-400 text-lg">info@islamicantiques.com</h3>
          </div>
          <div class="flex flex-col gap-4">
            <h2>Follow Us</h2>
            <div class="flex flex-row gap-4 items-center">
              <a href="https://www.pinterest.com/lapa3443/wwwarmsandantiquescom/" target="_blank">
                <IconPinterest />
              </a>
              <a href="https://www.instagram.com/armsandantiques/" target="_blank">
                <IconInstagram />
              </a>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <h2>Payment</h2>
            <div class="flex flex-row gap-4 items-center">
              <IconPaymentMasterCard />
              <IconPaymentPayPal />
              <IconPaymentVisa />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#1b1b1b]">
      <div
        class="flex flex-row justify-center items-center max-w-7xl mx-auto px-4 py-8 text-white gap-4"
      >
        <span class="text-xl">Share</span>
        <a target="_blank">
          <IconShareFacebook />
        </a>
        <a target="_blank">
          <IconPinterestAlt />
        </a>
        <a target="_blank">
          <IconTwitter />
        </a>
        <a target="_blank">
          <IconVK />
        </a>
        <a target="_blank">
          <IconSnapchat />
        </a>
      </div>

      <div
        class="flex justify-between items-center border-t border-[#858585] pt-8 max-w-7xl mx-auto px-4 py-8 text-xl"
      >
        <div class="flex flex-row gap-4 text-gray-400">
          <p>Copyright &copy; 2025 Arms And Antiques, Inc. All Rights Reserved.</p>
          <p class="w-[1px] h-hull bg-gray-400"></p>
          <p>
            Total Visitors:
            {{ useVisitorStore().visitorCount }}
          </p>
        </div>
        <a href="https://red-is.ru/" target="_blank" class="text-white">Designed by Redis</a>
      </div>
    </div>
  </footer>
</template>
